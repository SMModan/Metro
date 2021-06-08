import React from 'react'
import { View, Text, Keyboard } from 'react-native'
import { Tabs, Tab } from 'native-base'
import { Images, FontName, FontSize, Colors } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';



const MyTabs = ({ tabs }) => {
    return (
        <Tabs locked onChangeTab={(page) => {
            Keyboard.dismiss()
        }} tabContainerStyle={{ elevation: 0, borderWidth: 0, borderBottomColor: Colors.White, borderBottomWidth: 0 }} tabBarUnderlineStyle={{ backgroundColor: Colors.primaryColor500, height: ResponsivePixels.size2, borderRadius: ResponsivePixels.size3 }} tabBarBackgroundColor={Colors.White}>
            {
                tabs.map((tab) => (
                    <Tab heading={tab.name}
                        noShadow={true}
                        tabStyle={{ backgroundColor: Colors.secondary500, }}
                        activeTabStyle={{ backgroundColor: Colors.secondary500 }}
                        textStyle={{ color: Colors.secondary50, fontFamily: FontName.regular, fontSize: FontSize.fontSize17 }}
                        activeTextStyle={{ color: Colors.white, fontFamily: FontName.medium, fontSize: FontSize.fontSize17 }}>
                        {tab.component}
                    </Tab>
                ))
            }
        </Tabs>
    )
}

export default MyTabs