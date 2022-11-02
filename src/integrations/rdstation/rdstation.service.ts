import rdclient from 'rdstation-node-client';

interface IRDStationServiceCreateConversionParams {
  eventName: string;
  [key: string]: unknown;
}

export class RDStationService {
  private conversionsAPI;

  public constructor(token: string) {
    this.conversionsAPI = new rdclient.Conversions(token);
  }

  public async createConversion(params: IRDStationServiceCreateConversionParams) {
    const { eventName, ...data } = params;

    await this.conversionsAPI.createConversion(eventName, data);
  }
}
