import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
// formik
import {Formik} from 'formik';
// icons
import {Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFromArea, LeftIcon, RightIcon, StyledInputLabel, StyledTextInput, Colors, StyledText, StyledButton, ButtonText, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from './../components/styles';

//Colors
const {brand, darkLight, primary} = Colors;

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

import {View, TouchableOpacity} from 'react-native';

const Signup = () => {
          const [hidePassword, setHidePassword ] = useState(true);
          const [show, setShow] = useState(false);
          const [date, setDate] = useState(new Date(2000, 0, 1));

          //Actual date of birth to be sent
          const [dob, setDob] = useState();

          const onChange = (event, selectedDate) =>{
                    const currentDate = selectedDate || date;
                    setShow(false);
                    setDate(currentDate);
                    setDob(currentDate);
          }

          const showDatePicker = () =>{
                    setShow(true);
          }

          return (
                    <StyledContainer>
                              <StatusBar style="dark" />
                              <InnerContainer>
                                        <PageLogo resizeMode="cover" source={require('./../assets/images/logo.png')} />

                                        {show &&(
                                                  <DateTimePicker 
                                                            testID="dateTimePicker"
                                                            value={date}
                                                            mode='date'
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={onChange}
                                                  />
                                        )}

                                        <Formik 
                                                  initialValues={{fullName:"", email: "", dateOfBirth:"", password: "", confirmPassword:""}}
                                                  onSubmit={(values) => {
                                                            console.log(values);
                                                  }}
                                        >
                                                  {({handleChange, handleBlur, handleSubmit, values}) => (
                                                  <StyledFromArea>
                                                            <MyTextInput
                                                                      label="Full Name"
                                                                      icon="person"
                                                                      placeholder="Imdadul Haque"
                                                                      placeholderTextColor={darkLight}
                                                                      onChangeText={handleChange('fullName')}
                                                                      onBlur={handleBlur('fullName')}
                                                                      value={values.fullName}
                                                            />
                                                            <MyTextInput
                                                                      label="Email Address"
                                                                      icon="mail"
                                                                      placeholder="imdadul15-1440@diu.edu.bd"
                                                                      placeholderTextColor={darkLight}
                                                                      onChangeText={handleChange('email')}
                                                                      onBlur={handleBlur('email')}
                                                                      value={values.email}
                                                                      keyboardType="email-address"
                                                            />
                                                            <MyTextInput
                                                                      label="Mobile"
                                                                      icon="phone"
                                                                      placeholder="+8801700000000"
                                                                      placeholderTextColor={darkLight}
                                                                      onChangeText={handleChange('dateOfBirth')}
                                                                      onBlur={handleBlur('dateOfBirth')}
                                                                      value={dob ? dob.toDateString() : ""}
                                                                      isDate={true}
                                                                      editable={false}
                                                                      showDatePicker={showDatePicker}

                                                            />

                                                            <MyTextInput
                                                                      label="Password"
                                                                      icon="lock"
                                                                      placeholder="* * * * * * * *"
                                                                      placeholderTextColor={darkLight}
                                                                      onChangeText={handleChange('password')}
                                                                      onBlur={handleBlur('password')}
                                                                      value={values.password}
                                                                      secureTextEntry={hidePassword}
                                                                      isPassword = {true}
                                                                      hidePassword = {hidePassword}
                                                                      setHidePassword={setHidePassword}
                                                            />
                                                            <MyTextInput
                                                                      label="Confirm Password"
                                                                      icon="lock"
                                                                      placeholder="* * * * * * * *"
                                                                      placeholderTextColor={darkLight}
                                                                      onChangeText={handleChange('confirmPassword')}
                                                                      onBlur={handleBlur('confirmPassword')}
                                                                      value={values.password}
                                                                      secureTextEntry={hidePassword}
                                                                      isPassword = {true}
                                                                      hidePassword = {hidePassword}
                                                                      setHidePassword={setHidePassword}
                                                            />

                                                            <MsgBox>....</MsgBox>
                                                            <StyledButton onPress={handleSubmit}>
                                                                      <ButtonText>Signup</ButtonText>
                                                            </StyledButton>
                                                            <Line />
                                                            
                                                            <ExtraView>
                                                                      <ExtraText>Already have an account! </ExtraText>
                                                                      <TextLink>
                                                                                <TextLinkContent>Login</TextLinkContent>
                                                                      </TextLink>
                                                            </ExtraView>
                                                  </StyledFromArea>
                                                  )}
                                        </Formik>

                              </InnerContainer>
                    </StyledContainer>
          );
}

const MyTextInput =({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) =>{
          return(
                    <View>
                              <LeftIcon>
                                        <Octicons name={icon} size={30} color={brand} />
                              </LeftIcon>
                              <StyledInputLabel> {label}</StyledInputLabel>
                              {!isDate && <StyledTextInput {...props} />}
                              {isDate && (
                                        <TouchableOpacity onPress={showDatePicker}>
                                                  <StyledTextInput {...props} />
                                        </TouchableOpacity>
                              )}
                              
                              {isPassword && (
                                        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                                                  <Ionicons size={30} name={hidePassword ? "md-eye-off" : "md-eye"} color={darkLight}/>
                                        </RightIcon>
                              )}
                    </View>
          );
};

export default Signup;
