import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import { Colors, FontName, Images, Utils } from '../../utils';
import { strings } from '../../language/Language';
import {
  Checkbox,
  Button,
  FloatingEditText,
  ViewWithTitle,
  DatePicker,
  CustomDatePicker,
  MainContainer,
  ScrollContainer,
  ImageButton,
  ProgressDialog,
} from '../common';
import ResponsivePixels from '../../utils/ResponsivePixels';
import moment from 'moment';
import HelpDeskApi from './Api/HelpDeskApi';
import { goBack } from '../../navigation/Navigator';

class Solution extends Component {
  state = {
    selectedIndex: 0,
    solutions: this.props.solutuons || [],
  };

  addSolution = () => {
    const solution = this.state.solutions;

    solution.push({
      Actiontaken: '',
      TimetakenHr: '',
      TimetakenMin: '',
      RowStatus: 'add',
      SolutionDate: undefined,
      SolutionHr: '',
      SolutionMin: '',
      SolutionUserID: this.props.session.user.ID,
      ExternalSolution: false,
      id: 0,
    });
    this.setState({ solutions: [...solution] });
  };

  updateSolution = (key, value) => {
    const solutions = this.state.solutions;

    const solution = solutions[this.state.selectedIndex];

    solution[key] = value;

    solutions.splice(this.state.selectedIndex, solution);
    this.setState({ solution: [...solutions] });
  };

  deleteSolution = () => {


    const { solutions, selectedIndex } = this.state

    console.log("selectedIndex", selectedIndex, solutions[selectedIndex]["RowStatus"])
    if (solutions[selectedIndex]["RowStatus"] == "add") {
      solutions.splice(selectedIndex, 1)

    } else
      solutions[selectedIndex]["RowStatus"] = "delete"


    this.setState({ selectedIndex: solutions.filter(p => p.RowStatus != "delete").length - 1 })

    this.setState({
      solutions,
    }, () => {
      console.log("solutaion === ==== ==>", this.state.solutions)
    })
  }

  insertSolution = async () => {
    const solutions = this.state.solutions;
    for (let index = 0; index < solutions.length; index++) {
      const element = solutions[index];

      if (Utils.isEmpty(element.SolutionDate)) {
        Utils.showDangerToast('Select Solution date');
        this.setState({ selectedIndex: index });
        return;
      } else if (Utils.isEmpty(element.Actiontaken)) {
        Utils.showDangerToast('Enter action');
        this.setState({ selectedIndex: index });

        return;
      }
      if (
        Utils.isEmpty(element.TimetakenHr) ||
        Utils.isEmpty(element.TimetakenMin)
      ) {
        this.setState({ selectedIndex: index });

        Utils.showDangerToast('End Time taken');
        return;
      }
    }



    ProgressDialog.show();
    await Promise.all(
      solutions.map(async item => {
        const params = {
          Actiontaken: item.Actiontaken,
          Timetaken: `${item.TimetakenHr}.${item.TimetakenMin}`,
          RowStatus: item.RowStatus,
          SolutionUserID: item.SolutionUserID,
          ExternalSolution: item.ExternalSolution,
          SolutionDate: `${Utils.formatDate(item.SolutionDate, 'DD-MM-YYYY')} ${item.SolutionHr
            }:${item.SolutionMin}`,
          HelpdeskID: this.props.item.ID,
          Id: item.id,
        };

        await HelpDeskApi.insertSolution(params, this.hideDialogue());
      }),
    );

    if (this.props.onSolutionSaved)
      this.props.onSolutionSaved(this.state.solutions);

    goBack();
    if (this.props.item.ID) {
      Utils.showToast('Soulution updated');
    } else {
      Utils.showToast('Soulution added');
    }
  };

  hideDialogue = () => {
    ProgressDialog.hide();
  };
  render() {
    const { solutions } = this.state;
    const finalSolutions = solutions.filter(p => p.RowStatus != "delete")
    const solution = finalSolutions.length
      ? finalSolutions[this.state.selectedIndex]
      : undefined;

    const SolutionUserId = solution?.SolutionUserId || 0
    let isSolutionOwner = true
    if (SolutionUserId != 0) {
      isSolutionOwner = SolutionUserId == this.props.session.user.ID;
    } else {
      isSolutionOwner = true
    }
    console.log('isSolutionOwner ', isSolutionOwner);
    console.log('solution.SolutionUserId ', SolutionUserId);
    return (
      <ScrollContainer>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <ViewWithTitle title={'Solutions'}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ImageButton
                onPress={this.addSolution}
                source={Images.ic_add_blue}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: Colors.black,
                  fontFamily: FontName.regular,
                  marginStart: 8,
                }}>
                {'Add Solution'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <ScrollView
                horizontal={true}
                style={{
                  borderColor: Colors.white,
                  borderBottomColor: Colors.secondary50,
                  borderWidth: 1,
                }}>
                {finalSolutions.map((item, index) => (
                  <View>
                    <Chip
                      onClose={isSolutionOwner ? this.deleteSolution : undefined}
                      key={index}
                      style={{ backgroundColor: Colors.white }}
                      textStyle={{ fontSize: 13, color: Colors.black }}
                      onPress={() => {
                        this.setState({ selectedIndex: index });
                      }}>{`Soulution${index + 1}`}</Chip>
                    {this.state.selectedIndex === index ? (
                      <View style={{ height: 3, backgroundColor: Colors.blue }} />
                    ) : null}
                  </View>
                ))}
              </ScrollView>
            </View>
            {solution ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <CustomDatePicker
                    selectedDate={solution.SolutionDate}
                    maximumDate={new Date()}
                    onDateChanged={date => {
                      this.updateSolution('SolutionDate', date);
                      this.updateSolution(
                        'SolutionHr',
                        moment(date).get('hour').toString(),
                      );
                      this.updateSolution(
                        'SolutionMin',
                        moment(date).get('minute').toString(),
                      );
                      // onTextChanged("StartDate", date)
                    }}
                    label={'Solution Date'}
                    disabled={SolutionUserId != 0 || !isSolutionOwner}
                    containerStyle={{ flex: 1, marginTop: 3.5, marginEnd: 8 }}
                  />
                  <View>
                    <FloatingEditText
                      onChangeText={text => {
                        this.updateSolution('SolutionHr', text);
                      }}
                      label={'HH'}
                      editable={isSolutionOwner}
                      value={solution.SolutionHr}
                      inputType="numeric"
                      style={{ width: 80, marginEnd: 8 }}
                    />
                  </View>
                  <View>
                    <FloatingEditText
                      value={solution.SolutionMin}
                      onChangeText={text => {
                        this.updateSolution('SolutionMin', text);
                      }}
                      editable={isSolutionOwner}
                      label={'MM'}
                      inputType="numeric"
                      style={{ width: 80 }}
                    />
                  </View>
                </View>

                <FloatingEditText
                  multiline
                  minHeight={80}
                  onChangeText={text => {
                    this.updateSolution('Actiontaken', text);
                  }}
                  editable={isSolutionOwner}
                  label={'Enter action taken'}
                  value={solution.Actiontaken}
                />
                <View style={{ margin: 5 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        marginRight: 20,
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      <Text style={{ fontSize: 17, marginTop: 10 }}>
                        {'Time Spent:'}
                      </Text>
                    </View>
                    <FloatingEditText
                      value={solution.TimetakenHr}
                      onChangeText={text => {
                        this.updateSolution('TimetakenHr', text);
                      }}
                      label={'HH'}
                      editable={isSolutionOwner}
                      inputType="numeric"
                      style={{ width: 80, marginRight: 10 }}
                    />
                    <FloatingEditText
                      value={solution.TimetakenMin}
                      onChangeText={text => {
                        this.updateSolution('TimetakenMin', text);
                      }}
                      editable={isSolutionOwner}
                      label={'MM'}
                      inputType="numeric"
                      style={{ width: 80 }}
                    />
                  </View>
                </View>
                <Checkbox
                  onPress={() => {
                    this.updateSolution(
                      'ExternalSolution',
                      !solution.ExternalSolution,
                    );
                  }}
                  disabled={!isSolutionOwner}
                  label={'External Solution'}
                  labelColor={Colors.darkGray}
                  checked={solution.ExternalSolution}
                  color={Colors.BlueColor400}
                />
              </>
            ) : null}
          </ViewWithTitle>
          {solutions.length ? (
            <Button
              onPress={this.insertSolution}
              title={strings.save}
              style={{ margin: ResponsivePixels.size16 }}
            />
          ) : null}
        </View>
      </ScrollContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Solution);
