import React, { Fragment } from 'react';
import NewsCard from './NewsCard';

const NewsCardList = () => (
  <Fragment>
    <NewsCard
      title="プレイ画面のアニメーションを改善しました"
      date="2018/12/11"
    >
      プレイ画面のアニメーションを改善しました。具体的には、バックグラウンドの色変化・ノーツが叩かれた時の花火描画などです。
    </NewsCard>
    <NewsCard title="太鼓さん次郎エクスポートを追加しました" date="2018/10/03">
      太鼓さん次郎エクスポートを追加しました。現在、連打・大連打・風船のエクスポート処理が不完全なので、今後修正していく予定です。
    </NewsCard>
    <NewsCard title="創作の達人を大幅にアップデートしました" date="2018/09/30">
      創作画面にYouTube動画が表示されるようになりました。プレイモードが追加されました。倍速設定ができるようになりました。また、創作譜面を検索できるようになりました。その他にも細かなデザイン修正などが行われています。是非お楽しみください。
    </NewsCard>
  </Fragment>
);

export default NewsCardList;
