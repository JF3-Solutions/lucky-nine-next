'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NavbarSkeleton = () => (
  <>
    <Skeleton
      className='w-[100px] h-[32px]'
      highlightColor='#4d5693'
      baseColor='#171717'
      containerClassName='w-[100px]'
    />

    <Skeleton
      className='w-[30px] h-[6px] '
      highlightColor='#4d5693'
      baseColor='#171717'
      containerClassName='w-[30px] leading-[16px]'
      count={2}
      inline={true}
    />
  </>
);

export default NavbarSkeleton;
