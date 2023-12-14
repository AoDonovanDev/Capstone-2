'use client';

import { useState } from "react";

export default function usePlayer(){
  const [player, setPlayer] = useState(undefined);
  return [player, setPlayer]
}