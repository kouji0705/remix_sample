# Remix TODO App

Remixを使用したシンプルなTODOアプリケーション。段階的な実装を通じてRemixの基本的な機能を学習できます。

## 開発環境
- Node.js
- Remix
- TypeScript
- TailwindCSS
- SQLite + Prisma


# プロジェクト構成

```text
├── app/                    # アプリケーションのメインディレクトリ
│   ├── actions/           # アクション関連の処理
│   │   └── todoActions.ts # TODOのアクション（追加・削除・更新）を管理
│   │
│   ├── components/        # 再利用可能なコンポーネント
│   │   └── todo/
│   │       ├── TodoForm.tsx  # TODO追加用フォームコンポーネント
│   │       ├── TodoItem.tsx  # 個別のTODOアイテムを表示するコンポーネント
│   │       └── TodoList.tsx  # TODOリストを表示するコンポーネント
│   │
│   ├── lib/              # ユーティリティやライブラリの設定
│   │   └── db.server.ts  # Prismaクライアントの設定（サーバーサイド専用）
│   │
│   ├── models/           # データモデルと型定義
│   │   └── todo.ts       # TODOの型定義
│   │
│   ├── routes/           # ルーティング（Remixのファイルベースルーティング）
│   │   └── _index.tsx    # トップページのルート
│   │
│   └── services/         # ビジネスロジックとデータアクセス
│       └── todoService.ts # TODOのCRUD操作を実装
│
├── prisma/               # Prisma関連のファイル
│   ├── schema.prisma     # データベーススキーマの定義
│   ├── dev.db           # SQLiteデータベースファイル（.gitignoreに含める）
│   └── migrations/      # データベースマイグレーションファイル
│
├── public/              # 静的ファイル
│
├── styles/              # スタイルシート
│   └── tailwind.css     # TailwindCSSのエントリーポイント
│
├── package.json         # プロジェクトの依存関係と設定
├── tailwind.config.js   # TailwindCSSの設定
├── tsconfig.json        # TypeScriptの設定
└── README.md           # プロジェクトの説明
```

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
