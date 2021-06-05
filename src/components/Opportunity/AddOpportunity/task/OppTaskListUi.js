import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Colors } from '../../../../utils';
const OppTaskListUi = ({ taskList }) => {
    return (

        <View style={styles.MainHeaderView}>
            <View style={styles.MainList}>
                <FlatList
                    horizontal={false}
                    scrollEnabled={true}
                    data={taskList}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <TaskItem item={item} index={index} />}
                    keyExtractor={(item, index) => 'key' + index}
                    style={{ flex: 1, margin: 10 }}
                />
            </View>
        </View>

    )
}



const TaskItem = ({ item, index }) => {
    console.log("Items", item)
    return (
        <Card style={{ margin: 5 }} key={index}>
            <View style={{ margin: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 13, width: '70%', }}>{item.date}</Text>
                    <View style={{ width: 80, backgroundColor: Colors.Green50, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.Green500, margin: 3 }}>{item.status}</Text>
                    </View>
                </View>
                <Title style={{ fontSize: 16, marginTop: 8 }}>{item.title}</Title>
                <Text style={{ fontSize: 12, color: Colors.darkGray, }}>{item.description}</Text>
                <Text style={{ fontSize: 12, color: Colors.blueGray500, fontWeight: 'bold', marginTop: 16 }}>Priority :  <Text style={{ fontSize: 13, color: Colors.Red600, fontWeight: 'bold' }}>{item.header}</Text></Text>
                <Text style={{ fontSize: 15, color: Colors.darkGray, marginTop: 4 }}>{"Fingure print & card door controller"}</Text>
            </View>
        </Card>
    );
};

export default OppTaskListUi

const styles = StyleSheet.create({

    MainHeaderView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    },
    MainList: {
        flex: 1,
    },
})
