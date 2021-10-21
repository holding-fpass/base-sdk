import { ResourceType } from './type';
export declare abstract class ResourceBase {
    resourceId: string;
    resourceType: ResourceType;
    data?: any;
    constructor(resourceId: string, resourceType: ResourceType, data?: any);
}
