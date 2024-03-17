import ReadingIcon from "@/assets/icons/interests/reading.svg";
import PhotographyIcon from "@/assets/icons/interests/photography.svg";
import GamingIcon from "@/assets/icons/interests/gaming.svg";
import MusicIcon from "@/assets/icons/interests/music.svg";
import TravelIcon from "@/assets/icons/interests/travel.svg";
import PaintingIcon from "@/assets/icons/interests/painting.svg";
import PoliticsIcon from "@/assets/icons/interests/politics.svg";
import CharityIcon from "@/assets/icons/interests/charity.svg";
import CookingIcon from "@/assets/icons/interests/cooking.svg";
import PetsIcon from "@/assets/icons/interests/pets.svg";
import SportsIcon from "@/assets/icons/interests/sports.svg";
import FashionIcon from "@/assets/icons/interests/fashion.svg";
import { FC } from "react";
import { SvgProps } from "react-native-svg";

interface IconsMapping {
  [key: string]: FC<SvgProps>;
}

export const interests = [
  "Reading",
  "Photography",
  "Gaming",
  "Music",
  "Travel",
  "Painting",
  "Politics",
  "Charity",
  "Cooking",
  "Pets",
  "Sports",
  "Fashion",
];
export const icons: IconsMapping = {
  Reading: ReadingIcon,
  Photography: PhotographyIcon,
  Gaming: GamingIcon,
  Music: MusicIcon,
  Travel: TravelIcon,
  Painting: PaintingIcon,
  Politics: PoliticsIcon,
  Charity: CharityIcon,
  Cooking: CookingIcon,
  Pets: PetsIcon,
  Sports: SportsIcon,
  Fashion: FashionIcon,
};
