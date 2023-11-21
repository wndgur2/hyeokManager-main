import React from "react";
import { ListViewBase, StyleSheet, Text, View } from "react-native"
import { blacks } from "../colors";
import styles from "../styles";


export default function Setting(){
    return(
      <View style={{...styles.container, padding:10,}}>
        <View>
          <Text style={{fontSize:20, fontWeight:"bold", color:blacks[50]}}>
            INFORMATIONS
          </Text>
          <Text style={{...infoStyles.infoText, color:blacks[48], fontSize:16}}>
            개인 재정 관리 및 메모장 (로컬 스토리지)
          </Text>
          <Text style={infoStyles.specifics}> - 월 수입 (지정 날짜에, 지정 금액 자동 입금)</Text>
          <Text style={infoStyles.specifics}> - 수입/지출 내역 관리</Text>
          <Text style={infoStyles.specifics}> - 일 평균 지출 가능 금액 조회</Text>
          <Text style={infoStyles.specifics}> - 메모 텍스트 편집/저장</Text>
          <Text style={infoStyles.specifics}> - 가독성 고려 UI</Text>
          <Text style={infoStyles.specifics}> - 정결함 UX</Text>
          <Text style={infoStyles.specifics}> - component, screen, navigation 분할 DOM</Text>

          <View style={{marginTop:20, backgroundColor:blacks[3], paddingBottom:10}}>
            <Text style={infoStyles.infoText}>
              이중혁 dkandjsl@gmail.com
            </Text>
            <Text style={infoStyles.infoText}>
              한경대학교 컴퓨터공학과 3학년 (2022)
            </Text>
            <View style={{flexDirection:"row"}}>
              <Text style={infoStyles.infoText}>개발 : </Text>
              <Text style={{...infoStyles.infoText, backgroundColor:blacks[10], marginRight:8, padding:1}}>ReactNative (Expo)</Text>
              <Text style={{...infoStyles.infoText, backgroundColor:blacks[10], marginRight:8, padding:1}}>VScode</Text>
              <Text style={{...infoStyles.infoText, backgroundColor:blacks[10], marginRight:8, padding:1}}>Github</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

const infoStyles = StyleSheet.create({
  infoText:{
    color:blacks[40],
    marginTop:8,
    fontSize:14,
  },
  specifics:{
    color:blacks[45],
    fontSize:14,
    paddingVertical:2,
  }
});