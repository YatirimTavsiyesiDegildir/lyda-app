# LYDA App

Günümüzde özellikle gençlerden oluşan bir çoğunluk için finansal okuryazarlık büyük bir eksik. Değişen ekonomik şartlar, öğrenci hayat koşulları, sınırlı imkanlar ve daha bir çok etken insanları parayı daha idareli kullanmak zorunda bırakıyor. Biz de buna katkı sağlamak amacı ile "Lyda App"'i yarattık. Özellikle 18-30 yaş arası gençlere hitap eden uygulamamız, oyunlaştırma, sosyal finans, ve veri görselleştirme teknikleri kullanarak kişisel finans yönetimi için akıcı bir çözüm sunmayı amaçlıyor.

## Features
- **Veri Görselleştirme**: OpenBanking API'lardan çektiğimiz harcama, hesap bakiyesi ve benzeri verileri anlaması kolay grafikler haline getirerek sunan bir panel.

- **Sosyal Finans**: Uygulama üzerinden arkadaşlarınızı takip edebilir ve harcama verilerini karşılaştırarak tasarruf ve harcama önerileri alabilirsiniz.

- **Oyunlaştırma**: Kişiyi finansal anlamda daha bilinçli davranmaya iten "başarılar" ve "rozetler" ile oyunlaştırma unsurları ile daha keyifli ve akıcı bir deneyim.

- **Abonelik Yönetimi**: OpenBanking API'lardan çektiğimiz harcama geçmişlerinden "subscription" üyelik formatında olanları belirleyerek, kullanıcıya gösteren, uyarıda bulunan ve üyeliğin yenileneceği tarihten önce tekrar para çekilmeden kullanıcıya uyarılar.

## How to Run
- Install [Node.js](https://nodejs.org/en/download/) and [React Native](https://reactnative.dev/docs/getting-started) to your computer.
- `git clone https://github.com/YatirimTavsiyesiDegildir/lyda-app`
- `cd lyda-app && npm install`
#### Android
- Start an emulator from [Android Studio](https://developer.android.com/studio)
- `npx react-native run-android`
### iOS
- `npx react-native run-ios`

## Technologies Used
- [React Native](https://reactnative.dev/)
- [AWS Aurora](https://aws.amazon.com/tr/rds/aurora/)
- [Hasura](https://hasura.io/)
- [GraphQL](https://graphql.org/)
- [Apollo Client](https://www.apollographql.com/docs/)
- [Yapı Kredi OpenBanking API](https://apiportal.yapikredi.com.tr/)
