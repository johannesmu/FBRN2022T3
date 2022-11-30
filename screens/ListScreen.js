import { View, Text, FlatList } from "react-native";
import {useState, useEffect} from 'react'

export function ListScreen( props ) {
    const [ list, setList ] = useState([])

    useEffect( () => {
        console.log( props.data )
        setList(props.data)
    })

    const renderer = ({item}) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    ) 

    return(
        <View>
            <Text>List</Text>
            <FlatList data={ list } renderItem={renderer} keyExtractor={item => item.id}/>
        </View>
    )
}