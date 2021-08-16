import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Locale = {
  __typename?: 'Locale';
  iso: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  locales: Array<Locale>;
  locale?: Maybe<Locale>;
};


export type QueryLocaleArgs = {
  iso: Scalars['String'];
};

export type LocaleQueryVariables = Exact<{
  iso: Scalars['String'];
}>;


export type LocaleQuery = { __typename?: 'Query', locale?: Maybe<{ __typename?: 'Locale', iso: string }> };

export type LocalesQueryVariables = Exact<{ [key: string]: never; }>;


export type LocalesQuery = { __typename?: 'Query', locales: Array<{ __typename?: 'Locale', iso: string }> };


export const LocaleDocument = gql`
    query Locale($iso: String!) {
  locale(iso: $iso) {
    iso
  }
}
    `;

export function useLocaleQuery(options: Omit<Urql.UseQueryArgs<LocaleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LocaleQuery>({ query: LocaleDocument, ...options });
};
export const LocalesDocument = gql`
    query Locales {
  locales {
    iso
  }
}
    `;

export function useLocalesQuery(options: Omit<Urql.UseQueryArgs<LocalesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LocalesQuery>({ query: LocalesDocument, ...options });
};