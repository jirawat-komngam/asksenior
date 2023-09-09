import { GraphQLResolveInfo } from 'graphql';
import { GatewayContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Faculty = {
  __typename?: 'Faculty';
  facultyID: Scalars['ID']['output'];
  facultyName: Scalars['String']['output'];
  fields: Array<Field>;
};

export type Field = {
  __typename?: 'Field';
  fieldID: Scalars['ID']['output'];
  fieldName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  universities: Array<University>;
};

export type University = {
  __typename?: 'University';
  faculties: Array<Faculty>;
  universityID: Scalars['ID']['output'];
  universityName: Scalars['String']['output'];
  universityOrder: Scalars['Int']['output'];
  universityShortName: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Faculty: ResolverTypeWrapper<Faculty>;
  Field: ResolverTypeWrapper<Field>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  University: ResolverTypeWrapper<University>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Faculty: Faculty;
  Field: Field;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  String: Scalars['String']['output'];
  University: University;
}>;

export type FacultyResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = ResolversObject<{
  facultyID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  facultyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['Field']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FieldResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Field'] = ResolversParentTypes['Field']> = ResolversObject<{
  fieldID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  universities?: Resolver<Array<ResolversTypes['University']>, ParentType, ContextType>;
}>;

export type UniversityResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['University'] = ResolversParentTypes['University']> = ResolversObject<{
  faculties?: Resolver<Array<ResolversTypes['Faculty']>, ParentType, ContextType>;
  universityID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  universityName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  universityOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  universityShortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GatewayContext> = ResolversObject<{
  Faculty?: FacultyResolvers<ContextType>;
  Field?: FieldResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
}>;

