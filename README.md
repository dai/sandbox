# I build a feed reeder at v0.

boltで失敗し、lovableでクラッシュ、v0で形式はできた（イマココ）

localに移すべくvercelで管理、dai/sandbox と同期（Copilotで修正調整用途）。

## v0には以下を提出した

```prompt

## GitHub Activity Feed (github.com) Reader をつくりましょう。


Q: 以下の要件を満たすフィードリーダーを React/TypeScript で実装してください:

### 必須機能:

- GitHub Private Activity Feed (dai.private.atom) の RSS/Atom フィードを取得・解析
- フィードアイテムを時系列順に表示
- 各アイテムには最低限:
  - タイトル
  - 投稿日時
  - アクション種別(commit, issue等)
  - リポジトリ名
  - 説明文(あれば)を表示

### UI/UX要件:

- daiがセクシーだと吐露するデザイン
- モダンでクリーンなデザイン
- レスポンシブ対応
- ダークモード対応
- 無限スクロールまたはページネーション
- 読み込み中/エラー状態の適切な表示

### セキュリティ要件:

- トークンは最新プレビュー版の "Fine-grained Personal Access Token" を用いる（取得方法も記す）
- トークン認証の適切な実装
- センシティブ情報の安全な取り扱い

追加があると望ましい機能:

- フィルタリング(アクション種別、リポジトリ等、時系列)
- 検索機能
- 既読管理
- 更新通知

成果物として以下を提出してください:

- ソースコード
- セットアップ手順
- 使用した主要ライブラリと選定理由
```
