import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import { Colors, FontName, Images, Utils } from '../../utils';
import { strings } from '../../language/Language';
import { Checkbox, Button, FloatingEditText, ViewWithTitle, DatePicker, CustomDatePicker, MainContainer, ScrollContainer, ImageButton } from '../common';
import ResponsivePixels from '../../utils/ResponsivePixels';
import moment from 'moment';
import HelpDeskApi from './Api/HelpDeskApi';

class Solution extends Component {

  state = {
    selectedIndex: 0,
    solutions: []
  }


  addSolution = () => {

    const solution = this.state.solutions

    solution.push({
      Actiontaken: "",
      TimetakenHr: "",
      TimetakenMin: "",
      RowStatus: "add",
      SolutionDate: undefined,
      SolutionHr: "",
      SolutionMin: "",
      SolutionUserID: this.props.session.user.ID,
      ExternalSolution: false
    })
    this.setState({ solutions: [...solution] })
  }

  updateSolution = (key, value) => {

    const solutions = this.state.solutions

    const solution = solutions[this.state.selectedIndex]

    solution[key] = value

    solutions.splice(this.state.selectedIndex, solution)
    this.setState({ solution: [...solutions] })
  }

  insertSolution = () => {
    const solutions = this.state.solutions
    for (let index = 0; index < solutions.length; index++) {
      const element = solutions[index];

      if (Utils.isEmpty(element.SolutionDate)) {
        Utils.showDangerToast("Select Solution date")
        this.setState({ selectedIndex: index })
        return
      } else if (Utils.isEmpty(element.Actiontaken)) {
        Utils.showDangerToast("Enter action")
        this.setState({ selectedIndex: index })

        return
      } if (Utils.isEmpty(element.TimetakenHr) || Utils.isEmpty(element.TimetakenMin)) {
        this.setState({ selectedIndex: index })

        Utils.showDangerToast("End Time taken")
        return
      }
    }

    Promise.all(solutions.map(async (item) => {

      const params = {
        Actiontaken: item.Actiontaken,
        Timetaken: `${item.TimetakenHr}.${item.TimetakenMin}`,
        SolutionDate: `${Utils.formatDate(item.SolutionDate, "DD-MM-YYYY")} ${item.SolutionHr}:${item.SolutionMin}`,

      }

      await HelpDeskApi.insertSolution(params)
    }))
  }

  render() {
    const { solutions } = this.state
    const solution = solutions.length ? solutions[this.state.selectedIndex] : undefined
    return (
      <ScrollContainer>
        <View style={{ flex: 1, backgroundColor: Colors.white, }}>
          <ViewWithTitle title={'Solutions'}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageButton onPress={this.addSolution} source={Images.ic_add_blue} />
              <Text style={{ fontSize: 17, color: Colors.black, fontFamily: FontName.regular, marginStart: 8 }}>{"Add Solution"}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>

              <ScrollView horizontal={true} style={{ borderColor: Colors.white, borderBottomColor: Colors.secondary50, borderWidth: 1 }}>
                {solutions.map((item, index) =>
                  <View>
                    <Chip onClose={() => {

                    }} key={index} style={{ backgroundColor: Colors.white }} textStyle={{ fontSize: 13, color: Colors.black }} onPress={() => { this.setState({ selectedIndex: index }) }}>{`Soulution${index + 1}`}</Chip>
                    {
                      this.state.selectedIndex === index ? <View style={{ height: 3, backgroundColor: Colors.blue }} /> : null
                    }
                  </View>
                )}
              </ScrollView>
            </View>
            {solution ?
              <><View style={{ flexDirection: 'row', width: '100%', alignItems: "center" }}>
                <CustomDatePicker selectedDate={solution.SolutionDate} maximumDate={new Date()} onDateChanged={(date) => {
                  this.updateSolution("SolutionDate", date)
                  this.updateSolution("SolutionHr", moment(date).get("hour").toString())
                  this.updateSolution("SolutionMin", moment(date).get("min").toString())
                  // onTextChanged("StartDate", date)
                }} label={"Solution Date"} containerStyle={{ flex: 1, marginTop: 3.5, marginEnd: 8 }} />
                <View>
                  <FloatingEditText onChangeText={(text) => {
                    this.updateSolution("SolutionHr", text)

                  }} label={'HH'} value={solution.SolutionHr} inputType="numeric" style={{ width: 80, marginEnd: 8 }} />
                </View>
                <View>
                  <FloatingEditText value={solution.SolutionMin} onChangeText={(text) => {
                    this.updateSolution("SolutionMin", text)

                  }} label={'MM'} inputType="numeric" style={{ width: 80 }} />
                </View>
              </View>

                <FloatingEditText multiline minHeight={80} onChangeText={(text) => {
                  this.updateSolution("Actiontaken", text)

                }} label={'Enter action taken'} value={solution.Actiontaken} />
                <View style={{ margin: 5 }}>
                  <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                    <View style={{ marginRight: 20, justifyContent: 'center', flex: 1 }}>
                      <Text style={{ fontSize: 17, marginTop: 10 }}>{"Time Spent:"}</Text>
                    </View>
                    <FloatingEditText value={solution.TimetakenHr} onChangeText={(text) => {
                      this.updateSolution("TimetakenHr", text)

                    }} label={'HH'} inputType="numeric" style={{ width: 80, marginRight: 10 }} />
                    <FloatingEditText value={solution.TimetakenMin} onChangeText={(text) => {
                      this.updateSolution("TimetakenMin", text)

                    }} label={'MM'} inputType="numeric" style={{ width: 80 }} />
                  </View>
                </View>
                <Checkbox onPress={() => {

                  this.updateSolution("ExternalSolution", !solution.ExternalSolution)

                }} label={'External Solution'} labelColor={Colors.darkGray} checked={solution.ExternalSolution} color={Colors.BlueColor400} /></>
              : null}


          </ViewWithTitle>

          {solutions.length ? <Button onPress={this.insertSolution} title={strings.save} style={{ margin: ResponsivePixels.size16 }} /> : null}
        </View>
      </ScrollContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Solution);
