import React from 'react';
import Footer from '../components/Footer';
import { CardHeader, CardBody, CardText } from 'reactstrap';
import Container from '../styled/Container';
import Card from '../styled/Card';

const Help = () => (
  <div>
    <Container top={50}>
      <Card>
        <CardHeader>どうやって創作譜面をするの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            右側の画面のドンやカッを選択した状態で、中央の画面をクリックするとノーツが配置できます。
          </CardText>
          <CardText>
            ●
            または、中央の画面で数字をタイピングすることでノーツを配置することもできます。こちらの手法ですと、素早く創作譜面ができるのでお勧めです。1がドン、2がカッ、3が大ドン、4が大カッ、5が連打、6が大連打、7が風船、0が空白、といったように対応しています。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>どうやって再生するの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            YouTube動画IDとBPMとOFFSETがフォームに入力されていることを確認してください。
          </CardText>
          <CardText>
            ● YouTube動画を再生すると、それに合わせて譜面が再生されます。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>コピー&ペーストはできないの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            コピーしたい譜面1行の上にカーソルを置き、Cのキーを入力するとコピーできます。
          </CardText>
          <CardText>
            ●
            ペーストしたい譜面1行の上にカーソルを置き、Vのキーを入力するとペーストできます。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>YouTube動画IDって何？</CardHeader>
        <CardBody>
          <CardText>
            ●
            YouTube動画URLが「https://www.youtube.com/watch?v=jhOVibLEDhA」だとすると、「jhOVibLEDhA」がYouTube動画IDです。
          </CardText>
          <CardText>
            ●
            分からない場合には、YouTube動画IDを入力するフォームにそのままYouTube動画URLを貼り付けてください。自動的にフォーマットされます。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>プレイモードではどうやってプレイするの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            上側の画面をクリックしてください。その状態で、FまたはJのキーを入力するとドン、DまたはKのキーを入力するとカッになります。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>スマートフォンでうまく動かないんだけど？</CardHeader>
        <CardBody>
          <CardText>
            ●
            今の所はパソコンでの利用のみを想定していますので、スマートフォンはサポート対象外です。
          </CardText>
          <CardText>
            ●
            今後、時間はかかると思いますが、スマートフォンでも快適に創作譜面できるように対応したいと思っておりますので、応援よろしくお願いします。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>パソコンのSafariで太鼓の音が鳴らないんだけど？</CardHeader>
        <CardBody>
          <CardText>
            ● 今の所はGoogle
            Chromeのみをサポート対象として開発を行なっております。
          </CardText>
          <CardText>
            ●
            おそらく、FirefoxやEdgeなどのブラウザでも動くかと思いますが、Safariは今の所サポートできていませんのでご了承ください。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>太鼓さん次郎で遊ぶにはどうすればいいの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            tjaファイルは「太鼓さん次郎エクスポート」ボタンからダウンロードすることができます。必要に応じてファイルの中身を書き換えてください。
          </CardText>
          <CardText>
            ●
            それに加えて、音声ファイルが必要だと思うので、別途他のサービスを利用して該当するYouTube動画の音声をダウンロードしてください（こちらは自己責任でお願いします）。
          </CardText>
          <CardText>
            ●
            2つのファイルを所定のフォルダ内におけば遊ぶことができます。OFFSETなど一部のパラメータが調整必要かもしれません。ご了承ください。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>太鼓さん大次郎2で遊ぶにはどうすればいいの？</CardHeader>
        <CardBody>
          <CardText>
            ●
            tjaファイル自体は「太鼓さん次郎エクスポート」ボタンからダウンロードすることができます（スマートフォンではできない場合があります）。
          </CardText>
          <CardText>
            ●
            それに加えて、音声ファイルが必要だと思うので、別途他のサービスを利用して該当するYouTube動画の音声をダウンロードしてください（こちらは自己責任でお願いします）。
          </CardText>
          <CardText>
            ●
            2つのファイルをZIPでまとめるなどして、太鼓さん大次郎2にてインポートを行なってください。
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>他に分からないことがあるんだけど！</CardHeader>
        <CardBody>
          <CardText>
            ● 何か分からない点や、追加して欲しい機能などがありましたら、
            <a
              href="https://twitter.com/solt9029"
              target="_blank"
              rel="noopener noreferrer"
            >
              @solt9029
            </a>
            までご連絡いただけると幸いです。よろしくお願いします。
          </CardText>
        </CardBody>
      </Card>
    </Container>
    <Footer />
  </div>
);

export default Help;
