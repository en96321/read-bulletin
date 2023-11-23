# 104-bulletin

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js --id [員編]
```

掛進cronjob排程
```bash
sudo vi /usr/lib/cron/cron.allow
```
按Ｉ變成INSERT模式 加入自己的使用者帳號然後存檔(esc > :wq)
然後編輯crontab
```
crontab -e
```
按Ｉ進入INSERT模式 加入一筆
 分      小時     日       月       星期     命令
```
* */24 * * * bun run ~/documents/practice/104-bulletin/index.js --id [員編]
```
然後存檔(esc > :wq)

這時候下
```
crontab -l
```
應該就會看到有一筆排程了


This project was created using `bun init` in bun v1.0.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
