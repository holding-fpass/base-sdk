import { IInfiniteScrollPaginationClient, InfiniteScrollPaginationClient } from "./infinite-scroll-pagination-entity";

export class InfiniteScrollPaginationClientMapper {
  public static toHTTP<Item, NextPage = string | null>(infiniteScrollPagination: InfiniteScrollPaginationClient<Item, NextPage>): IInfiniteScrollPaginationClient.IHTTPInfiniteScrollPagination<Item, NextPage> {
    return {
      items: infiniteScrollPagination.items,
      limit: infiniteScrollPagination.limit,
      nextPage: infiniteScrollPagination.nextPage,
    }
  }

  public static toApplication<Item, HTTPItem, NextPage = string | null>(
    httpInfiniteScrollPagination: IInfiniteScrollPaginationClient.IHTTPInfiniteScrollPagination<HTTPItem, NextPage>,
    callback: (item: HTTPItem) => Item
  ): InfiniteScrollPaginationClient<Item, NextPage> {
    return new InfiniteScrollPaginationClient({
      items: httpInfiniteScrollPagination.items.map(callback),
      limit: httpInfiniteScrollPagination.limit,
      nextPage: httpInfiniteScrollPagination.nextPage
    });
  }
}
