export namespace IEmojiClient {
  export enum EEmoji {
    HEART = 'heart', // ❤️
    THUMBS_UP = 'thumbs-up', // 👍
    CLAP = 'clap', // 👏🏼
    STAR_STRUCK = 'star-struck', // 🤩
    SAD_BUT_RELIEVED_FACE = 'sad-but-relieved-face', // 😥
  }

  export interface IList {
    name: IEmojiClient.EEmoji;
    icon: string;
  }

  export interface IProps {
    name: IEmojiClient.EEmoji;
  }

  export interface IConstructor {
    name: IEmojiClient.IProps['name'];
  }
}

const emojiNameToIcon = new Map<IEmojiClient.EEmoji, string>(
  [
    [IEmojiClient.EEmoji.HEART, "❤️"],
    [IEmojiClient.EEmoji.THUMBS_UP, "👍"],
    [IEmojiClient.EEmoji.CLAP, "👏🏼"],
    [IEmojiClient.EEmoji.STAR_STRUCK, "🤩"],
    [IEmojiClient.EEmoji.SAD_BUT_RELIEVED_FACE, "😥"],
  ]
);


export class EmojiClient {
  private props: IEmojiClient.IProps;

  public constructor(props: IEmojiClient.IConstructor) {
    this.props = props;
  }

  public get name(): IEmojiClient.EEmoji {
    return this.props.name;
  }

  public get icon(): string {
    return emojiNameToIcon.get(this.props.name)!;
  }

  public static list: IEmojiClient.IList[] = [
    { name: IEmojiClient.EEmoji.HEART, icon: "❤️" },
    { name: IEmojiClient.EEmoji.THUMBS_UP, icon: "👍" },
    { name: IEmojiClient.EEmoji.CLAP, icon: "👏🏼" },
    { name: IEmojiClient.EEmoji.STAR_STRUCK, icon:"🤩" },
    { name: IEmojiClient.EEmoji.SAD_BUT_RELIEVED_FACE, icon: "😥" }
  ];
}
