'use client'

import { AspectRatio } from '@chakra-ui/react'

import { GoogleMapFailureStatus } from './GoogleMapFailureStatus'
import { GoogleMapLoadingStatus } from './GoogleMapLoadingStatus'
import { GoogleMapMarker } from './GoogleMapMarker'
import { GoogleMapRoot } from './GoogleMapRoot'
import { GoogleMapScript } from './GoogleMapScript'
import { GoogleMapViewport } from './GoogleMapViewport'

export const GoogleMap = {
  Script: GoogleMapScript,
  FailureStatus: GoogleMapFailureStatus,
  LoadingStatus: GoogleMapLoadingStatus,
  Root: GoogleMapRoot,
  Viewport: GoogleMapViewport,
  AspectRatio: AspectRatio,
  Marker: GoogleMapMarker,
}

export {
  GoogleMapScript,
  GoogleMapFailureStatus,
  GoogleMapLoadingStatus,
  GoogleMapRoot,
  GoogleMapViewport,
}
