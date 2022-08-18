export const Native = (name) => {    
    return `
    import React from 'react';
    import { View, StyleSheet, Text } from 'react-native';
    
    export const ${name} = () => {
        return (
            <View style={styles.Main}>
                <Text>${name} works!</Text>
            </View>
        );
    }

    const styles = StyleSheet.create({
        Main: {

        }
    });
    `
    }