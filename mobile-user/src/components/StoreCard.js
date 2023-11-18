import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
function StoreCard(props) {
    const {store} = props
    return (
        <TouchableOpacity>
            <View style={styles.storeCard}>
                <View style={styles.imageBackground}>
                    <Image 
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png"
                    }}
                    style={styles.storeImage}
                    />
                </View>
                <Text style={styles.storeText}>
                    {store.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    storeCard: {
        minHeight: 100,
        width: 90,
        // backgroundColor: "green",
        marginHorizontal: 10
    },
    imageBackground: {
        width: 90,
        height: 90,
        backgroundColor: "#5db075",
        justifyContent: "center",
        borderRadius: 90,
        alignSelf: "center"
    },
    storeImage: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    storeText: {
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold"
    }
})

export default StoreCard;