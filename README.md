# I build The MOS _Sexiest_ feed reeder at v0.（v0で私用セクシエストリーダーを作る。）

### 動機

> 取りこぼしが多いGitHub feedを細々設定可能な試験トークンの "Fine-grained Personal Access Token" でなんとかできないか？

と思い作成しました

boltで失敗し、lovableでクラッシュ、v0で形式はできた（イマココ）

localに移すべくvercelで管理、dai/sandbox と同期（Copilotで修正調整用途）。

## v0 Chatには以下文言を提出した

`prompt`
```markdown
# GitHub Activity Feed (github.com) Reader をつくらまいか？

Q: 以下の要件を満たすフィードリーダーを React/TypeScript で実装してください:

## 必須機能:

GitHub Private Activity Feed (dai.private.atom) の RSS/Atom フィードを取得・解析。

- フィードアイテムを時系列順に表示
- 各アイテムには最低限:
  - タイトル
  - 投稿日時
  - アクション種別(commit, issue等)
  - リポジトリ名
  - 説明文(あれば)を表示

## UI/UX要件:

リーダービューは https://github.com/kepano/defuddle を参考にする

- daiがセクシーだと吐露するデザイン
- モダンでクリーンなデザイン
- レスポンシブ対応
- ダークモード対応
- 無限スクロールまたはページネーション
- 読み込み中/エラー状態の適切な表示
- フィルタリング(アクション種別、リポジトリ等、時系列)

## セキュリティ要件:

- トークンは最新プレビュー版の "Fine-grained Personal Access Token" を用いる（取得方法も記す）
- トークン認証の適切な実装
- センシティブ情報の安全な取り扱い（保存しません。など）

### 追加であると望ましい機能:

- 検索機能
- 既読管理
- 更新通知

### 成果物として以下を提出してください:

- ソースコード
- セットアップ手順
- 使用した主要ライブラリと選定理由
```
