import { IInterestsResponse, IUser } from "@/interfaces";
import AbstractApi from "./utils/abstract-api";

class Meetup extends AbstractApi {
  private static instance: Meetup | null = null;
  readonly path = "meetup";

  constructor() {
    super("meetup");
  }

  public static getInstance(): Meetup {
    if (Meetup.instance === null) {
      Meetup.instance = new Meetup();
    }
    return Meetup.instance;
  }

  async getAllInterests(): Promise<IInterestsResponse> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/interests",
    });
    return response as IInterestsResponse;
  }

  async getForYouLookup(): Promise<IUser[]> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/for-you-lookup/",
    });
    return response as IUser[];
  }

  async getNearbyLookup(): Promise<IUser[]> {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/nearby-lookup/",
    });
    return response as IUser[];
  }
}
export default Meetup;
