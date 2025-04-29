# Remix TODO App

Remixを使用したシンプルなTODOアプリケーション。段階的な実装を通じてRemixの基本的な機能を学習できます。

## 開発環境
- Node.js
- Remix
- TypeScript
- TailwindCSS
- SQLite + Prisma

## セットアップ
```bash
# プロジェクトのクローン
git clone https://github.com/kouji0705/remix_sample.git
cd remix_sample

# 依存関係のインストール
npm install

# データベースのセットアップ
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
```

## 実装ステップ

### Step 1: 基本的なセットアップ
- Remixプロジェクトの作成
- TailwindCSSのセットアップ
- シンプルなヘッダーの作成
- 静的なTODOリストの表示
- コンポーネントの基本構造

### Step 2: APIとの連携
- モックAPIの実装
- Remixのloader関数でのデータ取得
- ローディング状態の表示
- コードの構造化（models, services, routes）
- 型定義の整備

### Step 3: コードの構造化とTODO操作機能
- コンポーネントの分割
  - TodoForm: 新規TODO追加フォーム
  - TodoItem: 個別のTODOアイテム
  - TodoList: TODOリストの表示
- アクション処理の分離
- TODOの追加・完了・削除機能の実装
- 型安全性の確保

### Step 4: データベース連携
- SQLite + Prismaのセットアップ
- データベーススキーマの定義
- CRUD操作の実装
- エラーハンドリング
- データの永続化
