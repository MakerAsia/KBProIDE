#libesp32

static lib สำหรับ link user_app บน kidbright
ส่วนของ library netpie เป็น subtree ที่มาจาก branch relase บน repository microgear-kidbright
การ pull update จาก subtree ใช้คำสั่ง

```
git subtree pull -P netpie https://gitlab.com/kidbright/microgear-kidbright release
```

จะเกิดการ merge หลังจากนั้น commit และ push ตามปกติ
