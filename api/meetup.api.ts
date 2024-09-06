import { IInterestsResponse } from "@/interfaces";
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
    console.log("get all interests");

    const response = await super.doFetch({
      method: "GET",
      pathExtension: "/interests",
    });
    return response as IInterestsResponse;
  }
}
export default Meetup;
