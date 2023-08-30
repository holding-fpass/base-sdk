import { IInfiniteScrollPaginationClient, InfiniteScrollPaginationClient } from "./infinite-scroll-pagination-entity";

export class InfiniteScrollPaginationClientMapper {
  public static toHTTP<Item, HTTPItem, NextPage = string | null>(
    infiniteScrollPagination: InfiniteScrollPaginationClient<Item, NextPage>,
    callback: (item: Item) => HTTPItem,
  ): IInfiniteScrollPaginationClient.IHTTPInfiniteScrollPagination<HTTPItem, NextPage> {
    return {
      items: infiniteScrollPagination.items.map(callback),
      limit: infiniteScrollPagination.limit,
      nextPage: infiniteScrollPagination.nextPage,
    }
  }

  public static toApplication<Item, HTTPItem, NextPage = string | null>(
    httpInfiniteScrollPagination: IInfiniteScrollPaginationClient.IHTTPInfiniteScrollPagination<HTTPItem, NextPage>,
    callback: (httpItem: HTTPItem) => Item
  ): InfiniteScrollPaginationClient<Item, NextPage> {
    return new InfiniteScrollPaginationClient({
      items: httpInfiniteScrollPagination.items.map(callback),
      limit: httpInfiniteScrollPagination.limit,
      nextPage: httpInfiniteScrollPagination.nextPage
    });
  }
}
