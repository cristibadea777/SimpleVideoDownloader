import { Text, TextInput, View } from "react-native"

const InputDurata = ( { styles, oraStart, minutStart, secundaStart, oraEnd, minutEnd, secundaEnd, setOraStart, 
                        setMinutStart, setSecundaStart, setOraEnd, setMinutEnd, setSecundaEnd} ) => {
    return (
        <View style={styles.containerInputDurata}>

            <View style={styles.containerRowInput}>
                <View style={styles.containerLeftInputTimp}>
                    <Text style={styles.text2}>Start time</Text>
                </View>
                <View style={styles.containerRightInputTimp}>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>hh</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                                keyboardType={"numeric"} 
                                maxLength={2} 
                                style={styles.casutaInput}
                                value={oraStart}
                                onChangeText={setOraStart}
                            />
                        </View>
                    </View>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>mm</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                                keyboardType={"numeric"} 
                                maxLength={2} 
                                style={styles.casutaInput}
                                value={minutStart}
                                onChangeText={setMinutStart}
                            />
                        </View>
                    </View>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>ss</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                                keyboardType={"numeric"} 
                                maxLength={2} 
                                style={styles.casutaInput}
                                value={secundaStart}
                                onChangeText={setSecundaStart}
                            />
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.containerRowInput}>
                <View style={styles.containerLeftInputTimp}>
                    <Text style={styles.text2}>End time</Text>
                </View>
                <View style={styles.containerRightInputTimp}>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>hh</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                            keyboardType={"numeric"} 
                            maxLength={2} 
                            style={styles.casutaInput}
                            value={oraEnd}
                            onChangeText={setOraEnd}
                        />
                        </View>
                    </View>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>mm</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                                keyboardType={"numeric"} 
                                maxLength={2} 
                                style={styles.casutaInput}
                                value={minutEnd}
                                onChangeText={setMinutEnd}
                            />
                        </View>
                    </View>
                    <View style={styles.containerLabelnput}>
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>ss</Text>
                        </View>
                        <View style={styles.containerCasutaInput}>
                            <TextInput 
                                keyboardType={"numeric"} 
                                maxLength={2} 
                                style={styles.casutaInput}
                                value={secundaEnd}
                                onChangeText={setSecundaEnd}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default InputDurata