# Express API

Express + TypeScriptによるAPIサーバーの試作です。

## 主要バージョン

- Express 5.1.0
- TypeScript 5.9系
- Node.js 20以上を推奨

## セットアップ

```bash
npm ci
```

## コマンド

```bash
# 開発サーバー（ts-node + nodemon）
npm run dev

# TypeScriptをdistへビルド
npm run build

# ビルド済みアプリを起動
npm start
```

## 使用している機能

- MongoDB接続（Mongoose）
- JWT認証（Passport／passport-jwt）
- bcryptによるパスワードハッシュ化
- CORS
- HelmetによるHTTPヘッダー設定
- express-rate-limitによるレート制限
- dotenvによる環境変数管理

## ディレクトリ

```text
express/
├── src/         # TypeScriptソース
├── models/      # データモデル
├── tsconfig.json
├── package.json
└── package-lock.json
```

環境変数は`.env`で管理し、認証情報や秘密値をリポジトリへ追加しないでください。

## 検証

```bash
npm ci
npm run build
```

自動テストはまだ実装されていません。`npm test`は未実装テストの終了コード1を返します。
