#include <LiquidCrystal_I2C.h>


const int melody[] = {
  262,294,330,349,293,440,494,523
};



const int APIN1 = 2;
const int APIN2 = 3;
const int APIN3 = 4;
const int APIN4 = 5;
const int APIN5 = 6;
const int APIN6 = 7;
const int APIN7 = 8;

const int APINDP = 9;

int buzzer_state = LOW;
bool buzzer_state_changed = false;

LiquidCrystal_I2C lcd(0x3F, 16, 2); // channel, 16 x 2




// 7 segment display
void display7Seg(char cc, boolean dp)
{
  digitalWrite(APINDP, dp);
  if(cc == '0')
  {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 1);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 0);
  } else if(cc == '1')
  {
    digitalWrite(APIN1, 0);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 0);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 0);
    digitalWrite(APIN7, 0);
  } else if(cc == '2') {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 0);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 1);
    digitalWrite(APIN6, 0);
    digitalWrite(APIN7, 1);
  } else if(cc == '3') {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 0);
    digitalWrite(APIN7, 1);
  } else if(cc == '4') {
    digitalWrite(APIN1, 0);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 0);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 1);
  } else if(cc == '5') {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 0);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 1);
  } else if(cc == '6') {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 0);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 1);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 1);
  } else if(cc == '7') {
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 0);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 0);
    digitalWrite(APIN7, 0);
  } else if(cc == '8'){
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 1);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 1);
  } else if(cc == '9'){
    digitalWrite(APIN1, 1);
    digitalWrite(APIN2, 1);
    digitalWrite(APIN3, 1);
    digitalWrite(APIN4, 1);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 1);
    digitalWrite(APIN7, 1);
  } else if(cc == 'o'){
    digitalWrite(APIN1, 0);
    digitalWrite(APIN2, 0);
    digitalWrite(APIN3, 0);
    digitalWrite(APIN4, 0);
    digitalWrite(APIN5, 0);
    digitalWrite(APIN6, 0);
    digitalWrite(APIN7, 0);
  }
  
}

void setup() {
  Serial.begin(9600);
  // 7 seg
  
  pinMode(APIN1, OUTPUT);
  pinMode(APIN2, OUTPUT);
  pinMode(APIN3, OUTPUT);
  pinMode(APIN4, OUTPUT);
  pinMode(APIN5, OUTPUT);
  pinMode(APIN6, OUTPUT);
  pinMode(APIN7, OUTPUT);

  
  display7Seg('o',true);

  // lcd
  lcd.init();
  lcd.backlight();
  
}


void loop() {

  char input[20];
  String ss;
  int namerow = 0;
  int dataprintrow = 1;
  //
  String author_info = "20162453  J W K";
  static int pattern = 1;


  if(pattern == 0){
  
    for(int i = 0; i < author_info.length(); i++){
          lcd.print(author_info[i]);
          delay(50);
     }
     
  }
  else{
     for(int i = author_info.length()-1; i >= 0; i--){
          lcd.setCursor(i, 0);
          lcd.print(author_info[i]);
          delay(50);
     }
   }
  
  pattern = (pattern+1)%2;
  
  if(Serial.available()){
    //data = Serial.read();
    int number;
    String letter;
    String temp;
    
    ss = Serial.readString();

    Serial.print(ss);
    //temp = ss;

    for(int i = 0; i < ss.length()-1; i++){
      if(ss[i] == '/'){
        temp = ss.substring(0,i);
        letter = ss.substring(i+1);
      }
    }
    Serial.println(temp);
    Serial.println(letter);
    
    display7Seg(temp[0], false);
    
    lcd.setCursor(0, dataprintrow);
        
    for(int i = 0; i < letter.length()-1; i++){
      lcd.print(letter[i]);
      delay(50);
    }
    
    delay(2000);
    lcd.clear();
    display7Seg('o',true);

  }


  delay(600);
  lcd.clear();
  

  
}
