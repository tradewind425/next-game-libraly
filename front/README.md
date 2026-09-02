# フロントエンド

Next.jsとReactで構成したゲームライブラリのフロントエンドです。ゲーム部分にはPhaserを使用し、Redux Toolkitでアプリケーションおよびゲームの状態を管理します。

## 現在の主要バージョン

- Next.js 15.5.25（Pages Router）
- React 18.3.1
- TypeScript 5.9.3
- Phaser 3.90.0
- Storybook 8.6.18
- Node.js 20.9以上（Next.jsの要件）

## セットアップ

```bash
npm ci
```

## 開発・検証

```bash
# 開発サーバー
npm run dev

# lint
npm run lint

# TypeScript型検査
npx tsc --noEmit

# production build
npm run build

# production server
npm run start

# Storybook
npm run storybook
```

## ページ

- `/`：トップページ
- `/breakOut`：ブロック崩し
- `/framework`：物理エンジン切り替えを含むゲームフレームワークの試作
- `/snakeGame`：スネークゲーム
- `/apollo`：Apollo Client／GraphQLの検証ページ
- `/strapi`：Strapi REST APIの検証ページ

## ゲームライブラリ

`src/components/`配下に、ゲーム本体と共通フレームワークの試作を配置しています。

- `breakOut`：Matter Physicsを使用したブロック崩し
- `snakeGame`：Arcade／Matter Physicsを切り替え可能なゲーム試作
- `framework`：物理エンジンを抽象化したゲームフレームワーク試作
- `bk`：初期段階のブロック崩し試作

Phaserはブラウザで実行するため、ゲームページでは`next/dynamic`の`ssr: false`を使用してクライアント側だけで読み込みます。

## 補足

- p5.js、styled-componentsなど、一部の依存パッケージは導入済みですが、全ページで使用しているわけではありません。
- Strapi APIとGraphQLページは、バックエンドが別途起動している場合にデータを取得できます。
- Storybookは導入済みですが、コンポーネントの網羅的なストーリー整備は別作業です。
