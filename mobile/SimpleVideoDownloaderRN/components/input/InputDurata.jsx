import { Text, TextInput, View } from "react-native"

const InputDurata = ( {styles} ) => {
    return (
        <View style={{backgroundColor: "white", width: "100%", height: "70%", borderColor: "black", borderWidth: 5}}>
            <View style={{backgroundColor: "cyan", width: "100%", height: "50%", flexDirection: "row"}}>
                <View style={{width: "30%", backgroundColor: "cyan", justifyContent: "center"}}>
                    <Text style={styles.text2}>Start time</Text>
                </View>
                <View style={{width: "67%", backgroundColor: "cyan", justifyContent: "center", flexDirection: "row"}}>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>hh</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>mm</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>ss</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center", alignItems: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{backgroundColor: "cyan", width: "100%", height: "50%", flexDirection: "row"}}>
                <View style={{width: "30%", backgroundColor: "cyan", justifyContent: "center"}}>
                    <Text style={styles.text2}>End time</Text>
                </View>
                <View style={{width: "67%", backgroundColor: "cyan", justifyContent: "center", flexDirection: "row"}}>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>hh</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>mm</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: "cyan", width: "33%", flexDirection: "row"}}>
                        <View style={{width: "40%", backgroundColor: "cyan", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>ss</Text>
                        </View>
                        <View style={{width: "50%", alignItems: "center", justifyContent: "center", alignItems: "center"}}>
                            <TextInput keyboardType={"numeric"} maxLength={2} style={{height: "50%", width: "100%", backgroundColor: "white", textAlign: "center", fontSize: 17}}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default InputDurata