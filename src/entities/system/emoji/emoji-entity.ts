import { IReactionClient } from "../reaction";

const emojiNameToIcon = new Map<IReactionClient.EEmoji, string>(
  [
    [IReactionClient.EEmoji.HEART, "❤️"],
    [IReactionClient.EEmoji.THUMBS_UP, "👍"],
    [IReactionClient.EEmoji.CLAP, "👏🏼"],
    [IReactionClient.EEmoji.STAR_STRUCK, "🤩"],
    [IReactionClient.EEmoji.SAD_BUT_RELIEVED_FACE, "😥"],
  ]
);

export namespace IEmojiEntity {
  export enum EEmoji {
    HEART = 'heart', // ❤️
    THUMBS_UP = 'thumbs-up', // 👍
    CLAP = 'clap', // 👏🏼
    STAR_STRUCK = 'star-struck', // 🤩
    SAD_BUT_RELIEVED_FACE = 'sad-but-relieved-face', // 😥
  }

  export interface IProps {
    name: IEmojiEntity.EEmoji;
  }

  export interface IConstructor {
    name: IEmojiEntity.IProps['name'];
  }
}

export class EmojiClient {
  private props: IEmojiEntity.IProps;

  public constructor(props: IEmojiEntity.IConstructor) {
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get icon(): string {
    return emojiNameToIcon.get(this.props.name)!;
  }

  public static list = ["❤️", "👍", "👏🏼", "🤩", "😥"];
}
