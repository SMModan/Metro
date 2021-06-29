import React, { useRef } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { NoDataView, ProgressView, ScrollContainer } from '.'

export default function MyFlatList({ renderItem,
    numColumns, style, loading, extraData, data,
    onRefresh, refreshing, onEndReached, noDataMsg, ItemSeparatorComponent, footerComponent }) {

    const flatList = useRef(null)

    // useEffect(() => {

    //     if (footerComponent && flatList && flatList.current) {
    //         setTimeout(() => {

    //             flatList.current.scrollToEnd({ animated: true })

    //         }, 100)
    //     }
    // }, [footerComponent])
    const renderList = () => {

        return (<FlatList
            onLayout={(e) => {

                console.log("e".e)
            }}
            data={data}
            ref={flatList}
            refreshing={refreshing}
            numColumns={numColumns}
            style={style}
            onRefresh={onRefresh}
            extraData={extraData}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            keyExtractor={(item, index) => "key" + index}
            onEndReached={() => {

                if (onEndReached && data.length >= 10)
                    onEndReached()
            }}
            onEndReachedThreshold={0.8}
            ListFooterComponent={footerComponent}
        />)

    }

    const renderLoading = () => {

        return (<ProgressView />)

    }

    const renderNoData = () => {

        return (<ScrollContainer
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <NoDataView message={noDataMsg || "No data found"} />
        </ScrollContainer>)
    }


    const render = () => {

        return loading ? renderLoading() : data.length > 0 ? renderList() : renderNoData()

    }

    return (
        <View style={{ flex: 1 }}>

            {render()}

        </View>
    )
}
