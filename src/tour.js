export default {
  endDialog: {
    title : {
      th : "ถึงเวลาลุย !",
      en : "Time to explorer"
    },
    content: {
      th: `เราได้แนะนำคุณสมบัติที่สำคัญของ IDE ไปแล้ว ส่วนอื่นที่เหลือเราให้คุณได้ทดลองได้ตามใจชอบและหวังว่าคุณจะถูกใจ
      <br/><br/>   หากมีข้อสงสัยหรือคำชี้แนะเพิ่มเติมสามารถแจ้งเข้ามาได้ที่
      <a href="#"
         onclick="require('electron').shell.openExternal('https://github.com/MakerAsia/KBProIDE/issues')">
          <strong> Github </strong> </a>  ได้เลย  `,
      en: `That it, all our main features and hope you like it. You can explorer the IDE now. If you have any suggestions/issues or comment, please kindly let us know
      <a href="#"
         onclick="require('electron').shell.openExternal('https://github.com/MakerAsia/KBProIDE/issues')">
          <strong> Github </strong> </a>
      `,
    },
  },
  button: {
    th: {
      buttonSkip: "ปิดคำแนะนำนี้",
      buttonPrevious: "ย้อนกลับ",
      buttonNext: "ถัดไป",
      buttonStop: "สิ้นสุด",
    },
    en: {
      buttonSkip: "Skip tour",
      buttonPrevious: "Previous",
      buttonNext: "Next",
      buttonStop: "Finish",
    },
  },
  th: [
    {//0
      target: ".v-toolbar__content",
      content: `นี่คือเมนูของ KBIDE เครื่องมือทั้งหมดจะถูกรวบรวมไว้ที่นี่เพื่อให้ใช้งานได้ง่าย โดยเมนูจะมีสองฝั่ง</br>
&lt; ด้านซ้ายมือ จะเป็นเมนูสำหรับ KBIDE</br>&gt;ด้านขวามือ จะเป็นเมนูสำหรับบอร์ด</br>
เอาหล่ะ! เราจะมาดูรายละเอียดกันในภายหลัง`,
      params: {
        highlight: true,
      },
    },
    {//1
      target: "#inspire > div.application--wrap > main > div > div",
      content: `และนี่คือส่วนของพื้นที่ในการทดลองและเขียนโปรแกรมของคุณ คุณสามารถใช้งานการเขียนโปรแกรมต่าง ๆ ได้ตามใจชอบ`,
      params: {
        highlight: true,
      },
    },
    {//2
      target: "#inspire > div.application--wrap > footer",
      content: `พื้นที่ด้านล่างเล็ก ๆ นี้มีไว้สำหรับแสดงสถานะต่าง ๆ`,
      params: {
        highlight: true,
      },
    },
    {//3
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(5)",
      content: `เมนูนี้ใช้สำหรับการเลือกโหมดการเขียนโปรแกรม </br>เราจะเข้าไปดูด้านในกัน`,
      params: {
        highlight: true,
      },
    },
    {//4
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div > div",
      content: `KBIDE จะมีโหมดการเขียนโปรแกรมสองแบบ</br>
- Kid Level จะเป็นการเขียนโปรแกรมด้วยบล็อค</br>
- Programmer Level จะเขียนโปรแกรมด้วยโค้ด</br>`,
      params: {
        placement: "top",
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
        highlight: true,
      },
    },
    {//5
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(3)",
      content: `เราจะมาเปลี่ยนเป็นโหมดโปรแกรมกัน ลองดูว่าจะเกิดอะไรขึ้นบ้าง`,
      params: {
        highlight: true,
        placement: "bottom",
      },
    },
    {//6
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-sheet.v-sheet--tile.theme--light",
      content: `คุณสามารถเปลี่ยนโหมดได้ตลอด แต่โปรดจำไว้ว่า</br></br>คุณ<strong>สามารถแปลง block ให้เป็นโค้ดภาษา C ได้ แต่โค้ดภาษา C จะไม่สามารถแปลงเป็น block ได้</strong></br></br> ดังนั้นกรุณาบันทึกโค้ดคุณก่อนเปลี่ยนโหมดเสมอ </br></br>
ตัวเลือกนี้คุณสามารถเลือกแปลง block เป็นโค้ด หรือสร้างโค้ดใหม่ได้ เราจะลองสร้างใหม่ดู`,
      buttonPrevious: false,
      params: {
        highlight: true,
        placement: "top",
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
      },
    },
    {//7
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(3)",
      content: `เมนูนี้ใช้สำหรับการจัดการบอร์ดที่ใช้งาน คุณสามารถ ติดตั้ง/เปลี่ยน/ลบ บอร์ดที่เมนูนี้`,
      buttonPrevious: false,
      params: {
        highlight: true,
      },
    },
    {//8
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div > div:nth-child(2) > div > div",
      content: `นี่คือบอร์ดทั้งหมดที่คุณติดตั้งไว้ คุณสามารถเลือกได้อย่างอิสระ และสามารถติดตั้งเพิ่มได้จากด้านล่าง (ต้องเชื่อมต่ออินเตอร์เน็ตก่อน)`,
      params: {
        highlight: true,
      },
    },
    {//9
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(4)",
      content: `เมนูนี้ใช้สำหรับการจัดการปลั๊กอินเพื่อเพิ่มความสามารถให้บอร์ดของคุณ`,
      params: {
        highlight: true,
      },
    },
    {//10
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div > div:nth-child(5)",
      content: `เหมือนว่าตอนนี้คุณยังไม่ปลั๊กอิน แต่ไม่เป็นไร! หากเชื่อมต่ออินเตอร์เน็ตคุณสามารถเลือกติดตั้งได้ที่นี่`,
      params: {
        highlight: true,
      },
    },
    {//11
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(5)",
      content: `เมนูนี้รวมรวมตัวอย่างการเขียนบล็อคและโค้ดเอาไว้`,
      params: {
        highlight: true,
      },
    },
    {//12
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div",
      content: `เราแบ่งตัวอย่างออกเป็นหมวดหมู่ย่อย มีทั้งบล๊อกและโค้ด ถ้าคุณโชคดี บางตัวอย่างอาจมีคำอธิบายไว้ </br></br> และจำไว้อย่างหนึ่งว่าหน้าต่างที่เปิดตัวอย่างไว้จะไม่บันทึกโค้ดอัตโนมัติ และไม่บันทึกการตั้งค่าต่าง ๆ ฉนั้นอย่าลืมบันทึกโค้ดคุณก่อนปิดเสมอ`,
      params: {
        highlight: true,
      },
    },
    {//13
      target: "#inspire > div.application--wrap > nav > div > span:nth-child(6)",
      content: `เมนูนี้สำหรับการตั้งค่า IDE คุณสามารถเปลี่ยนสี ปรับ editor ขนาดตัวอักษรได้ที่นี่`,
      params: {
        highlight: true,
      },
    },
    {//14
      target: "#themeSetting > div",
      content: `คุณสามารถเปลี่ยนสี ปรับ editor ขนาดตัวอักษรได้ที่นี่`,
      params: {
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
        placement: "left",
        highlight: true,
      },
    },
  ],
  en: [
    {//0
      target: ".v-toolbar__content",
      content: `KBIDE menu is collected in here, there are left and right side</br>
&lt; Left for KBIDE</br>&gt;Right for the board</br>
we'll take a look later`,
      params: {
        highlight: true,
      },
    },
    {//1
      target: "#inspire > div.application--wrap > main > div > div",
      content: `This is your main workspace`,
      params: {
        highlight: true,
      },
    },
    {//2
      target: "#inspire > div.application--wrap > footer",
      content: `A little space here is StatusBar, to monitoring what's going on in IDE`,
      params: {
        highlight: true,
      },
    },
    {//3
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(5)",
      content: `This menu for changing IDE's mode, let take a look inside`,
      params: {
        highlight: true,
      },
    },
    {//4
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div > div",
      content: `KBIDE have 2 modes</br>- Kid Level : block programming</br>- Programmer Level : text C/CPP programming</br>`,
      params: {
        placement: "top",
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
        highlight: true,
      },
    },
    {//5
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(3)",
      content: `We'll change to Programmer mode, let see what's gonna happen`,
      params: {
        highlight: true,
      },
    },
    {//6
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-sheet.v-sheet--tile.theme--light",
      content: `You can change mode anytime, but remember</br></br> you <strong>can convert block to C/CPP code but cannot convert back.</strong></br></br>So, save the code before change mode</br>`,
      params: {
        placement: "top",
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
        highlight: true,
      },
    },
    {//7
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(3)",
      content: `This menu for manage your dev-board, with install/update/remove allowed in here`,
      params: {
        highlight: true,
      },
    },
    {//8
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div > div:nth-child(2) > div > div",
      content: `This is your board, you can change/remove/update and install more as long as your have internet`,
      params: {
        highlight: true,
      },
    },
    {//9
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(4)",
      content: `This is plugin management menu`,
      params: {
        highlight: true,
      },
    },
    {//10
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div > div:nth-child(5)",
      content: `It look like you have no plugins, but don't worry you can install it in here.`,
      params: {
        highlight: true,
      },
    },
    {//11
      target: "#inspire > div.application--wrap > nav > div > div:nth-child(5)",
      content: `This is example menu, a lot of code are collected in here.`,
      params: {
        highlight: true,
      },
    },
    {//12
      target: "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.smooth-scrollbar > div.scroll-content > div",
      content: `We group examples together some example have block, code or event tutorial if you lucky</br></br> Remember : every window open by here will not backup the code and settings, please save it before close`,
      params: {
        highlight: true,
      },
    },
    {//13
      target: "#inspire > div.application--wrap > nav > div > span:nth-child(6)",
      content: `This is setting menu, you can custom IDE in here`,
      params: {
        highlight: true,
      },
    },
    {//14
      target: "#themeSetting > div",
      content: `You can change theme, editor properties in here.`,
      params: {
        highlight: true,
        placement: "left",
        modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}},
      },
    },
  ],
};
