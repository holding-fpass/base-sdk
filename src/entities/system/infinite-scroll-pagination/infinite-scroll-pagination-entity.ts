export namespace IInfiniteScrollPaginationClient {
  export interface IHTTPInfiniteScrollPagination<Item, NextPage = string | null> {
    items: Item[];
    limit: number;
    nextPage: NextPage | null;
  }

  export interface IProps<Item, NextPage = string | null> {
    items: Item[];
    limit: number;
    nextPage: NextPage | null;
  }

  export namespace IClass {
    export namespace IMethods {
      export interface IConstructor<Item, NextPage> {
        items: IInfiniteScrollPaginationClient.IProps<Item, NextPage>['items'];
        limit: IInfiniteScrollPaginationClient.IProps<Item, NextPage>['limit'];
        nextPage: IInfiniteScrollPaginationClient.IProps<Item, NextPage>['nextPage'];
      }
    }
  }
}

export class InfiniteScrollPaginationClient<Item, NextPage = string | null> {
  private props: IInfiniteScrollPaginationClient.IProps<Item, NextPage>;

  public constructor(
    props: IInfiniteScrollPaginationClient.IClass.IMethods.IConstructor<
      Item,
      NextPage
      >
  ) {
    this.props = props;
  }

  public get items(): IInfiniteScrollPaginationClient.IProps<
    Item,
    NextPage
    >['items'] {
    return this.props.items;
  }

  public get limit(): IInfiniteScrollPaginationClient.IProps<
    Item,
    NextPage
    >['limit'] {
    return this.props.limit;
  }

  public get nextPage(): IInfiniteScrollPaginationClient.IProps<
    Item,
    NextPage
    >['nextPage'] {
    return this.props.nextPage;
  }
}
