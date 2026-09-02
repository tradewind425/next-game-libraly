# next-game-libraly

Next.jsとPhaserを中心に、ブラウザゲームの試作とゲーム開発用フレームワークを検証するプロジェクトです。
フロントエンド、Express API、Strapi CMSを独立したディレクトリで管理しています。

## 構成

```text
next-game-libraly/
├── front/              # Next.js／React／Phaserフロントエンド
├── back/
│   ├── express/        # Express + TypeScript API
│   └── strapi/         # Strapi CMS（REST／GraphQL）
├── todo_GameLibrary.md # ゲーム開発の計画メモ
└── todo_REDUX.md       # Redux学習・実装メモ
```

## 主要バージョン

### Frontend

- Next.js 15.5.25（Pages Router）
- React 18.3.1
- TypeScript 5.9.3
- Phaser 3.90.0
- Storybook 8.6.18
- Node.js 20.9以上

### Backend

- Express 5.1.0
- Strapi 4.21.1
- MongoDB／Mongoose（Express側）
- SQLite（Strapi側）

## セットアップ

各アプリケーションは個別に依存関係をインストールします。

### Frontend

```bash
cd front
npm ci
```

### Express API

```bash
cd back/express
npm ci
```

### Strapi CMS

```bash
cd back/strapi
npm ci
```

## 起動

### Frontend

```bash
cd front
npm run dev
```

ゲームページには以下のURLでアクセスできます。

- `/`：トップページ
- `/breakOut`：ブロック崩し
- `/framework`：ゲームフレームワーク試作
- `/snakeGame`：スネークゲーム
- `/apollo`：Apollo Client／GraphQL検証ページ
- `/strapi`：Strapi REST API検証ページ

### Express API

```bash
cd back/express
npm run dev
```

### Strapi CMS

```bash
cd back/strapi
npm run dev
```

## 検証

Frontendの検証コマンド：

```bash
cd front
npm run lint
npx tsc --noEmit
npm run build
```

Express APIの検証コマンド：

```bash
cd back/express
npm run build
```

現在、自動テストは実装されていません。`npm test`は未実装テストの終了コード1を返します。

## 実行環境に関する注意

Strapi 4の`package.json`はNode.js `>=18.0.0 <=20.x.x`を要求します。Strapiを起動・検証する場合はNode.js 20系を使用してください。

Strapi 4から5への更新はAPI・設定・データ構造に影響するため、まだ実施していません。

環境変数は各アプリケーションの`.env`で管理し、認証情報や秘密値をリポジトリへ追加しないでください。

## 詳細ドキュメント

- [Frontend README](front/README.md)
- [Backend README](back/README.MD)
- [Express API README](back/express/README.MD)
