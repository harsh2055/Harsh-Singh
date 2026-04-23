import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  key?: React.Key;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--border)] rounded opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function ProjectSkeleton() {
  return (
    <div className="bg-[var(--card)] border-thin p-8 rounded-lg space-y-6">
      <div className="flex justify-between items-start">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="space-y-4">
        <div className="flex gap-6">
           <Skeleton className="h-4 w-16 pt-1" />
           <Skeleton className="h-12 flex-1" />
        </div>
        <div className="flex gap-6">
           <Skeleton className="h-4 w-16 pt-1" />
           <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  );
}

export function GithubPulseSkeleton() {
  return (
    <div className="bg-[var(--card)] border-thin rounded-lg p-8 flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="flex space-x-8">
          <div className="space-y-1 text-center">
            <Skeleton className="h-8 w-12 mx-auto" />
            <Skeleton className="h-3 w-8 mx-auto" />
          </div>
          <div className="space-y-1 text-center">
            <Skeleton className="h-8 w-12 mx-auto" />
            <Skeleton className="h-3 w-8 mx-auto" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 md:grid-cols-24 gap-1.5 overflow-hidden">
        {Array.from({ length: 48 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-3 rounded-sm" />
        ))}
      </div>
      <div className="flex justify-between items-center pt-6 border-t border-thin">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="h-3 w-16 ml-auto" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>
      </div>
    </div>
  );
}
