import React from 'react';
import { CardHeader, CardBody, CardText } from 'reactstrap';
import Container from '../styled/Container';
import Card from '../styled/Card';

const News = () => (
  <Container top={100}>
    <Card>
      <CardHeader>
        更新情報：太鼓さん次郎エクスポートを追加しました（2018/10/03）
      </CardHeader>
      <CardBody>
        <CardText>
          太鼓さん次郎エクスポートを追加しました。現在、連打・大連打・風船のエクスポート処理が不完全なので、今後修正していく予定です。
        </CardText>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>
        更新情報：創作の達人を大幅にアップデートしました（2018/09/30）
      </CardHeader>
      <CardBody>
        <CardText>
          創作画面にYouTube動画が表示されるようになりました。プレイモードが追加されました。倍速設定ができるようになりました。また、創作譜面を検索できるようになりました。その他にも細かなデザイン修正などが行われています。是非お楽しみください。
        </CardText>
      </CardBody>
    </Card>
  </Container>
);

export default News;
