import React from "react";
import { Text, StyleSheet, FlatList, View, TextInput, Button } from "react-native";
import { useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatBot() {
  const PALM_API = "AIzaSyC19660O5KBpYUZUpKWs_L0ZpNagyrs9uY";
  const [message, setMessage] = useState([]);
  const [inputText, setInputText] = useState("");

  const GAText = async (text) => {
    if (inputText.trim() === "") {
      return;
    }
    const API_URL = `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage`;
    const API_KEY = `?key=${PALM_API}`;
    const requestData = {
      prompt: {
        context: "",
        examples: [],
        message: [{ content: inputText }],
      },
      temperature: 0.1,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };
    const headers = {
      "Content-Type": "application/json",
    };
        try {
          const response = await axios.post(`${API_KEY}`, requestData, { headers });
          if (response.status === 200) {
            if (
              response.data &&
              response.data.candidates &&
              response.data.candidates.length > 0
            ) {
              const botResponse = response.data.candidates[0].content;

              const NewUserMessage = {
                id: message.length + 1,
                text: inputText,
                sender: "user",
                timeStamps: new Date().getTime(),
              };
              const NewBotMessage = {
                id: message.length + 2,
                text: botResponse,
                sender: "bot",
                timeStamps: new Date().getTime(),
              };

              setMessage([...message, NewUserMessage, NewBotMessage]);
              setInputText("");
            }
            else {
              console.log("Response is empty");
            }
          }
          else{
            console.log("Response is not 200");
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Chat Bot</Text>
          <FlatList
            data={message}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: item.sender === "user" ? "#000" : "#fff",
                      padding: 10,
                      borderRadius: 10,
                      maxWidth: "75%",
                    }}
                  >
                    <Text
                      style={{
                        color: item.sender === "user" ? "#fff" : "#000",
                        fontSize: 16,
                      }}
                    >
                      {item.sender === "user" ? item.text : item.content}
                    </Text>
                    <Text style={{ color: item.sender === "user" ? "#fff" : "#000", fontSize: 12, textAlign: "right", marginTop: 5 }}>
                      {new Date(item.timeStamps).toLocaleTimeString()}
                    </Text>
                  </View>

                </View>
              )
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              placeholder={"Type a message"}
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                flex: 1,
                marginRight: 10,
              }}
            />
            <Button
              title={"Send"}
              onPress={() => GAText(inputText)}
              color={"#000"}
            />
          </View>
        </SafeAreaView>
      )
    }
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#f28",
        paddingHorizontal: 16,
        paddingTop: 24,
      },
      title: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 16,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 20,
      },
    });
