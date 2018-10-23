Clova Friends Robot data
====
## LINE Clova friends / friends mini ロボット化システム概要
- スマートスピーカーである Friendsシリーズ をロボットにするためのハードウェア"ロボスーツ",ロボットをobniz経由で動かすためのAPI から構成されています。
- 自身ので開発したclovaスキルと連携して使用することで、スマートスピーカーの表現の拡張が可能です。

## ロボスーツを作る上で必要なもの
- サーボモータ SG90 x 2個 : http://akizukidenshi.com/catalog/g/gM-08761/
- obniz : https://obniz.io/
- 両端ロングピンヘッダ　: http://akizukidenshi.com/catalog/g/gC-09056/
- ロボットアーム x 2set
- ロボットボディ

## obnizの接続方法
- 右手は GND: 0 pin, VCC :1 pin, SIGNAL :2 pin
- 左手は GND: 9 pin, VCC :10 pin, SIGNAL :11 pin

## 資料について
- 3D data -> ロボットアームとロボットボディの3Dデータが入っています。
             -- STLファイル-> 3Dプリントをするときのファイルです。そのまま出力する際はこちらを使ってください。
             -- STEPファイル ->　お好きな３DCADで加工ができるファイルです。データ加工後、STLファイルで保存することで３Dプリントができます
- API : APIのソースコードです。参考にしてお使いください。
- パッケージはのぞいております。利用する場合はパッケージを追加した上でお使いください。
- 改造してご自由にお使いください。

## APIについて
- APIは AWS API Gateway と Lambdaで開発しております。
- HTTPリクエストで動く様になっており、アプリやスキルなどからGETをすることで動きます
- 変数はクリエ文字列で出来ております
1. ID -> obnizのIDを入力してください "XXXX-XXXX"という形にになります
2. action -> 現在は'start', 'raiseRight', 'raiseLeft', 'dropHand', 'raiseBoth', 'Rage', 'Happy', 'Bye', 'Initial'で動きます
3. delya -> 最初の動作をするまでに待ち時間を設定することが出来ます。時間はmsecで表現します。

https://bqr0t1cli1.execute-api.ap-northeast-1.amazonaws.com/prod/LINE_clova_obniz/?ID=XXXX-XXXX&action=XXXX&delay=XXXX

## Licence
This software is released under the MIT License, see LICENSE.

## Authors
Norippy in rino products(http://www.rino-make-fun.com/)
