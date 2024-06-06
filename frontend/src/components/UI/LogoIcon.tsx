import { FC } from 'react'

const LogoIcon: FC<{ width: number; height: number }> = ({ width, height }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 78 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z'
				fill='#A8B4F6'
			/>
			<path
				d='M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.997 9.34877 20.9424 6.80699 19.0677 4.93228C17.193 3.05758 14.6512 2.00303 12 2ZM12 18C10.8133 18 9.65328 17.6481 8.66658 16.9888C7.67989 16.3295 6.91085 15.3925 6.45673 14.2961C6.0026 13.1997 5.88378 11.9933 6.11529 10.8295C6.3468 9.66557 6.91825 8.59647 7.75736 7.75736C8.59648 6.91824 9.66558 6.3468 10.8295 6.11529C11.9933 5.88378 13.1997 6.0026 14.2961 6.45672C15.3925 6.91085 16.3295 7.67988 16.9888 8.66658C17.6481 9.65327 18 10.8133 18 12C17.9982 13.5907 17.3655 15.1158 16.2406 16.2406C15.1158 17.3655 13.5907 17.9982 12 18Z'
				fill='url(#paint0_linear_1999_245)'
			/>
			<path
				d='M33.8182 16.5H30.8608V7.77273H33.8778C34.7443 7.77273 35.4886 7.94744 36.1108 8.29688C36.7358 8.64347 37.2159 9.14205 37.5511 9.79261C37.8864 10.4432 38.054 11.2216 38.054 12.1278C38.054 13.0369 37.8849 13.8182 37.5469 14.4716C37.2116 15.125 36.7273 15.6264 36.0938 15.9759C35.4631 16.3253 34.7045 16.5 33.8182 16.5ZM32.4418 15.1321H33.7415C34.3494 15.1321 34.8565 15.0213 35.2628 14.7997C35.669 14.5753 35.9744 14.2415 36.179 13.7983C36.3835 13.3523 36.4858 12.7955 36.4858 12.1278C36.4858 11.4602 36.3835 10.9062 36.179 10.4659C35.9744 10.0227 35.6719 9.69176 35.2713 9.47301C34.8736 9.25142 34.3793 9.14062 33.7884 9.14062H32.4418V15.1321ZM42.3857 16.6278C41.7294 16.6278 41.1626 16.4915 40.6854 16.2188C40.2109 15.9432 39.8459 15.554 39.5902 15.0511C39.3345 14.5455 39.2067 13.9503 39.2067 13.2656C39.2067 12.5923 39.3345 12.0014 39.5902 11.4929C39.8487 10.9815 40.2095 10.5838 40.6726 10.2997C41.1357 10.0128 41.6797 9.86932 42.3047 9.86932C42.7081 9.86932 43.0888 9.93466 43.4467 10.0653C43.8075 10.1932 44.1257 10.392 44.4013 10.6619C44.6797 10.9318 44.8984 11.2756 45.0575 11.6932C45.2166 12.108 45.2962 12.6023 45.2962 13.1761V13.6491H39.9311V12.6094H43.8175C43.8146 12.3139 43.7507 12.0511 43.6257 11.821C43.5007 11.5881 43.326 11.4048 43.1016 11.2713C42.88 11.1378 42.6214 11.071 42.326 11.071C42.0107 11.071 41.7337 11.1477 41.495 11.3011C41.2564 11.4517 41.0703 11.6506 40.9368 11.8977C40.8061 12.142 40.7393 12.4105 40.7365 12.7031V13.6108C40.7365 13.9915 40.8061 14.3182 40.9453 14.5909C41.0845 14.8608 41.2791 15.0682 41.5291 15.2131C41.7791 15.3551 42.0717 15.4261 42.407 15.4261C42.6314 15.4261 42.8345 15.3949 43.0163 15.3324C43.1982 15.267 43.3558 15.1719 43.4893 15.0469C43.6229 14.9219 43.7237 14.767 43.7919 14.5824L45.2322 14.7443C45.1413 15.125 44.968 15.4574 44.7124 15.7415C44.4595 16.0227 44.1357 16.2415 43.7408 16.3977C43.3459 16.5511 42.8942 16.6278 42.3857 16.6278ZM52.2603 9.95455L49.9293 16.5H48.2248L45.8938 9.95455H47.5387L49.043 14.8168H49.1112L50.6197 9.95455H52.2603ZM53.396 16.5V7.77273H56.6687C57.3391 7.77273 57.9016 7.89773 58.3562 8.14773C58.8136 8.39773 59.1587 8.74148 59.3917 9.17898C59.6275 9.61364 59.7454 10.108 59.7454 10.6619C59.7454 11.2216 59.6275 11.7187 59.3917 12.1534C59.1559 12.5881 58.8079 12.9304 58.3477 13.1804C57.8874 13.4276 57.3207 13.5511 56.6474 13.5511H54.4783V12.2514H56.4343C56.8263 12.2514 57.1474 12.1832 57.3974 12.0469C57.6474 11.9105 57.832 11.723 57.9513 11.4844C58.0735 11.2457 58.1346 10.9716 58.1346 10.6619C58.1346 10.3523 58.0735 10.0795 57.9513 9.84375C57.832 9.60795 57.646 9.42472 57.3931 9.29403C57.1431 9.16051 56.8207 9.09375 56.4258 9.09375H54.9769V16.5H53.396ZM63.8118 16.6278C63.1726 16.6278 62.6186 16.4872 62.1499 16.206C61.6811 15.9247 61.3175 15.5312 61.0589 15.0256C60.8033 14.5199 60.6754 13.929 60.6754 13.2528C60.6754 12.5767 60.8033 11.9844 61.0589 11.4759C61.3175 10.9673 61.6811 10.5724 62.1499 10.2912C62.6186 10.0099 63.1726 9.86932 63.8118 9.86932C64.451 9.86932 65.005 10.0099 65.4737 10.2912C65.9425 10.5724 66.3047 10.9673 66.5604 11.4759C66.8189 11.9844 66.9482 12.5767 66.9482 13.2528C66.9482 13.929 66.8189 14.5199 66.5604 15.0256C66.3047 15.5312 65.9425 15.9247 65.4737 16.206C65.005 16.4872 64.451 16.6278 63.8118 16.6278ZM63.8203 15.392C64.1669 15.392 64.4567 15.2969 64.6896 15.1065C64.9226 14.9134 65.0959 14.6548 65.2095 14.331C65.326 14.0071 65.3842 13.6463 65.3842 13.2486C65.3842 12.848 65.326 12.4858 65.2095 12.1619C65.0959 11.8352 64.9226 11.5753 64.6896 11.3821C64.4567 11.1889 64.1669 11.0923 63.8203 11.0923C63.4652 11.0923 63.1697 11.1889 62.9339 11.3821C62.701 11.5753 62.5263 11.8352 62.4098 12.1619C62.2962 12.4858 62.2393 12.848 62.2393 13.2486C62.2393 13.6463 62.2962 14.0071 62.4098 14.331C62.5263 14.6548 62.701 14.9134 62.9339 15.1065C63.1697 15.2969 63.4652 15.392 63.8203 15.392ZM68.2575 16.5V9.95455H69.7532V11.0455H69.8214C69.9407 10.6676 70.1452 10.3764 70.435 10.1719C70.7276 9.96449 71.0614 9.8608 71.4364 9.8608C71.5217 9.8608 71.6168 9.86506 71.7219 9.87358C71.8299 9.87926 71.9194 9.8892 71.9904 9.90341V11.3224C71.9251 11.2997 71.8214 11.2798 71.6793 11.2628C71.5401 11.2429 71.4052 11.233 71.2745 11.233C70.9933 11.233 70.7404 11.294 70.516 11.4162C70.2944 11.5355 70.1197 11.7017 69.9918 11.9148C69.864 12.1278 69.8001 12.3736 69.8001 12.652V16.5H68.2575ZM76.6353 9.95455V11.1477H72.8725V9.95455H76.6353ZM73.8015 8.38636H75.3441V14.5312C75.3441 14.7386 75.3754 14.8977 75.4379 15.0085C75.5032 15.1165 75.5884 15.1903 75.6935 15.2301C75.7987 15.2699 75.9151 15.2898 76.043 15.2898C76.1396 15.2898 76.2276 15.2827 76.3072 15.2685C76.3896 15.2543 76.4521 15.2415 76.4947 15.2301L76.7546 16.4361C76.6722 16.4645 76.5543 16.4957 76.4009 16.5298C76.2504 16.5639 76.0657 16.5838 75.8469 16.5895C75.4606 16.6009 75.1126 16.5426 74.8029 16.4148C74.4933 16.2841 74.2475 16.0824 74.0657 15.8097C73.8867 15.5369 73.7987 15.196 73.8015 14.7869V8.38636Z'
				fill='#20293A'
			/>
			<defs>
				<linearGradient id='paint0_linear_1999_245' x1='18' y1='19' x2='6.5' y2='4' gradientUnits='userSpaceOnUse'>
					<stop stop-color='#838CF1' />
					<stop offset='1' stop-color='#443BC4' />
				</linearGradient>
			</defs>
		</svg>
	)
}
export default LogoIcon
