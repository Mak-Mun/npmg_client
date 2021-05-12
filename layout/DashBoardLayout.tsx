import React from 'react'
import SideBar from '../components/SideBar'
import Nav from '../components/Nav'
export default function DashBoardLayout({children}) {
  let list = [
		{
			name: 'Dashboard',
			url: '/dashboard'
		},
		{
			name: 'Tasks',
			url: '/tasks'
		},
		{
			name: 'Gorillas',
			url: '/gorillas'
		},
		{
			name: 'Rangers',
			url: '/rangers'
		},
		{
			name: 'Doctors',
			url: '/doctors'
		},
		{
			name: 'Kwitizina',
			url: '/kwitizina'
		},
		{
			name: 'Reports',
			url: '/reports'
		},
		{
			name: 'Store',
			url: '/store'
		},
		{
			name: 'Settings',
			url: '/settings'
		}
	];
  return (
    <div className="h-screen bg-gray-100 grid grid-cols-6 gap-1">
		<SideBar items={list} />

	<div className="col-span-3 flex flex-col">
		<Nav />
		{children}
	</div>
</div>
  )
}
