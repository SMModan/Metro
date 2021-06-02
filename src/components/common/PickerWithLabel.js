import React from 'react'
import { View, Text } from 'react-native'
import  CustomPicker  from '../common/CustomPicker'
import Images from '../../utils/Images';
import { Colors,FontName,fontSize } from '../../utils';

export default PickerWithLabel = ({
    parentData,
    childData,
    parentSelection,
    childSelection,
    onChangeParentSelection,
    onChangeChildSelection,
    label,
    parentHint,
    labelStyle,
    iconStyle,
    pickerContainerStyle,
    icon,

    childHint }) => {

    return (
        <View style={{ flexDirection: 'row',  }}>

            {/* <View style={{
            }}>
                <Text style={{ ...styles.labelStyle, ...labelStyle }}>{ }</Text>
            </View> */}

            <View style={{ }}>
                <CustomPicker containerStyle={{ ...styles.pickerContainerStyle, ...pickerContainerStyle }}
                    items={parentData}
                    placeholder={{
                        label: parentHint,
                        value: 0
                    }}
                    iconStyle={iconStyle}
                    placeholderTextColor={Colors.Info500}
                    icon={icon || Images.ic_DownBlackIcon}
                    value={parentSelection}
                    onValueChange={onChangeParentSelection}
                />


                {childData ? <CustomPicker containerStyle={{ ...styles.pickerContainerStyle, ...pickerContainerStyle }}
                    items={childData}
                    placeholder={{
                        label: childHint,
                        value: -1
                    }}
                    iconStyle={iconStyle}
                    placeholderTextColor={'#7C7C7C'}
                    icon={icon || Images.ic_DownArrowIcon}
                    value={childSelection}
                    onValueChange={onChangeChildSelection}
                /> : null}


            </View>
        </View>
    )

}

const styles = {
    labelStyle: {
        // marginHorizontal:16,
        fontSize: 15,
        fontfamily:FontName.medium,
        color:Colors.Info500,
       // width:80,
        //fontWeight: 'medi',
       
    },
    pickerContainerStyle: {
        //width:80,
        left:-10,
        //alignItems:'center',
        //flexDirection:'row',
        borderColor: Colors.BorderUnSelectedColor
    },
    iconStyle:{
        height:24,
        width:24,
        //left:-10
    }
}