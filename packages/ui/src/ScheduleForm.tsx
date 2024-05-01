'use client'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useRequestFormSearch } from './useRequestFormSearch'

dayjs.extend(isBetween)

const requestSchema = z.object({
  time: z
    .string()
    .refine(
      time => {
        const now = dayjs()
        const maxTime = now.add(4, 'hour')
        const inputTime = dayjs(`${now.format('YYYY-MM-DD')} ${time}`)

        const isBetween = inputTime.isBetween(now, maxTime, 'minutes')

        return isBetween
      },
      { message: 'Start time Should be within 4 hours' },
    )
    .transform(time =>
      dayjs(`${dayjs().format('YYYY-MM-DD')} ${time}`).format('YYYY-MM-DDTHH:mm:ss'),
    ),
  numberOfTrucks: z.string().min(1),
  cadence: z.string().min(0),
})

type RequestSchemaType = z.infer<typeof requestSchema>

export const ScheduleForm = () => {
  const { setSearch } = useRequestFormSearch()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequestSchemaType>({ resolver: zodResolver(requestSchema) })

  return (
    <>
      <form
        onSubmit={handleSubmit(v => {
          setSearch(v)
        })}
      >
        <VStack
          align={'stretch'}
          gap={4}
        >
          <Text>Select How many Trucks and the Cadence</Text>

          <SimpleGrid
            columns={3}
            gap={4}
          >
            <FormControl isInvalid={Boolean(errors.time)}>
              <FormLabel htmlFor='time'>Start Time</FormLabel>
              <Input
                id='time'
                type='time'
                {...register('time')}
              />
              {errors.time && <FormErrorMessage>{errors.time.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.numberOfTrucks)}>
              <FormLabel htmlFor='numberOfTrucks'>Number of Trucks</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  id='numberOfTrucks'
                  {...register('numberOfTrucks')}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.numberOfTrucks && (
                <FormErrorMessage>{errors.numberOfTrucks.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.cadence)}>
              <FormLabel htmlFor='cadence'>Cadence</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  id='cadence'
                  {...register('cadence')}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.numberOfTrucks && (
                <FormErrorMessage>{errors.numberOfTrucks.message}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <Flex justify={'flex-end'}>
            <Button
              type='submit'
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Check
            </Button>
          </Flex>
        </VStack>
      </form>
      <DevTool control={control} />
    </>
  )
}
