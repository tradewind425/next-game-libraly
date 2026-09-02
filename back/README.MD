# バックエンド

フロントエンドから利用するバックエンドの試作です。Express APIとStrapi CMSを独立したアプリケーションとして配置しています。

## 構成

```text
back/
├── express/  # Express + TypeScript API
└── strapi/   # Strapi CMS（REST／GraphQL）
```

## Express

- Express 5.1.0
- TypeScript
- MongoDB／Mongoose
- JWT認証
- bcryptによるパスワードハッシュ化
- Passport／passport-jwt
- CORS、Helmet、レートリミット

```bash
cd express
npm ci
npm run dev     # 開発サーバー
npm run build   # TypeScriptをdistへビルド
npm start       # ビルド済みアプリを起動
```

## Strapi

- Strapi 4.21.1
- REST API
- GraphQL
- SQLite
- Users & Permissions、i18n、Cloudプラグイン

```bash
cd strapi
npm ci
npm run dev     # 管理画面付き開発サーバー
npm run build   # 管理画面をビルド
npm start       # production server
```

### Strapiの実行環境

Strapi 4の`package.json`はNode.js `>=18.0.0 <=20.x.x`を要求します。Node.js 24ではサポート範囲外です。Strapiを起動・検証する場合はNode.js 20系を使用してください。

Strapi 4から5への更新はAPI・設定・データ構造に影響するため、今回の依存更新には含めていません。
