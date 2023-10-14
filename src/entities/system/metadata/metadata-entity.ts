export namespace IMetadataClient {
  export interface IHTTPMetadata {
    title: string;
    description?: string;
    domain: string;
    duration?: number;
    favicon?: string;
    images: string[];
    url: string;
  }

  export interface IProps {
    title: string;
    description?: string;
    domain: string;
    duration?: number;
    favicon?: string;
    images: string[];
    url: string;
  }

  export interface IConstructor {
    title: IMetadataClient.IProps['title'];
    description?: IMetadataClient.IProps['description'];
    domain: IMetadataClient.IProps['domain'];
    duration?: IMetadataClient.IProps['duration'];
    favicon?: IMetadataClient.IProps['favicon'];
    images: IMetadataClient.IProps['images'];
    url: IMetadataClient.IProps['url'];
  }
}

export class MetadataClient {
  private props: IMetadataClient.IProps;

  public constructor(props: IMetadataClient.IConstructor) {
    this.props = {
      ...props,
      title: props.title,
      description: props.description,
      domain: props.domain,
      duration: props.duration,
      favicon: props.favicon,
      images: props.images,
      url: props.url,
    };
  }

  public get title(): IMetadataClient.IProps['title'] {
    return this.props.title;
  }

  public get description(): IMetadataClient.IProps['description'] {
    return this.props.description;
  }
  
  public get domain(): IMetadataClient.IProps['domain'] {
    return this.props.domain;
  }

  public get duration(): IMetadataClient.IProps['duration'] {
    return this.props.duration;
  }

  public get favicon(): IMetadataClient.IProps['favicon'] {
    return this.props.favicon;
  }
  
  public get images(): IMetadataClient.IProps['images'] {
    return this.props.images;
  }

  public get url(): IMetadataClient.IProps['url'] {
    return this.props.url;
  }
}
