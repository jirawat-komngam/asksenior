import { gql } from '@apollo/client'
import { apolloClient } from '../../../main'
import { handleGraphQLError } from '../../../helpers/error-helper'

const GQL = gql`
    query Universities {
        universities {
            faculties {
                facultyID
                facultyName
                fields {
                    fieldID
                    fieldName
                }
            }
            universityID
            universityName
            universityOrder
            universityShortName
        }
    }
`
export interface GetLatestSubscriptionAPIResponse {
    data: {
        universities: UniversityModel[]
    }
}
export interface UniversityModel {
    universityID: string
    universityName: string
    universityOrder: number
    universityShortName: string
    faculties: FacultyModel[]
}
export interface FacultyModel {
    facultyID: string
    facultyName: string
    fields: FieldModel[]
}
export interface FieldModel {
    fieldID: string
    fieldName: string
}
export const callGetAllUniversity =
    (): Promise<GetLatestSubscriptionAPIResponse> => {
        return new Promise((resolve, reject) => {
            const handler = async () => {
                const result = await apolloClient
                    .query({
                        query: GQL,
                    })
                    .catch(handleGraphQLError(reject))
                resolve(result as GetLatestSubscriptionAPIResponse)
            }
            handler()
        })
    }
