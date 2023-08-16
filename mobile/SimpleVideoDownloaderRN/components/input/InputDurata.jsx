import { Text, TextInput, View } from "react-native"

const handleChangeValue = (value, set) => { 
    if(value >= 60)
        set('59')
    else if(value < 0)
        set('00')
    else 
        set(value)
}

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
                                onChangeText={(value) => {handleChangeValue(value, setOraStart)}}
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
                                onChangeText={(value) => {handleChangeValue(value, setMinutStart)}}
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
                                onChangeText={(value) => {handleChangeValue(value, setSecundaStart)}}
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
                            onChangeText={(value) => {handleChangeValue(value, setOraEnd)}}
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
                                onChangeText={(value) => {handleChangeValue(value, setMinutEnd)}}
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
                                onChangeText={(value) => {handleChangeValue(value, setSecundaEnd)}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default InputDurata