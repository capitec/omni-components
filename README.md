<!-- ⚠️ This README has been generated from the file(s) "readme/blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#welcome-to-omni-components-)

# ➜ Welcome to Omni Components 
<h1 align="center">@capitec/omni-components</h1>
<p align="center">
  <img src="https://avatars.githubusercontent.com/u/109590421" alt="Logo" width="150" height="auto" />
</p>

<p align="center">
  <b>Omni Components come with minimal dependencies to reduce the bloat in your project. All web components base off Lit (https://lit.dev) and are each available as fully standalone imports or at a group level import.</b></br>
  <sub><sub>
</p>

<br />


<p align="center">
		<a href="https://npmcharts.com/compare/@capitec/omni-components?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@capitec/omni-components.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@capitec/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@capitec/omni-components.svg" height="20"/></a>
<a href="https://github.com/capitec/omni-components/actions/workflows/build.yml"><img alt="Build" src="https://github.com/capitec/omni-components/actions/workflows/build.yml/badge.svg" height="20"/></a>
<a href="https://capitec.github.io/open-source/?repo=Omni-Components"><img alt="Docs" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTUiIGhlaWdodD0iMjAiIHJvbGU9ImltZyIgYXJpYS1sYWJlbD0iRG9jcyI+PHRpdGxlPkRvY3M8L3RpdGxlPjxsaW5lYXJHcmFkaWVudCBpZD0icyIgeDI9IjAiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYmIiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iLjEiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iciI+PHJlY3Qgd2lkdGg9IjU1IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI3IpIj48cmVjdCB3aWR0aD0iMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzU1NSIvPjxyZWN0IHg9IjAiIHdpZHRoPSI1NSIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwN2VjNiIvPjxyZWN0IHdpZHRoPSI1NSIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNzKSIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iVmVyZGFuYSxHZW5ldmEsRGVqYVZ1IFNhbnMsc2Fucy1zZXJpZiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgZm9udC1zaXplPSIxMTAiPjxpbWFnZSB4PSI1IiB5PSIzIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBWUFBQUFHQUNBWUFBQUNreDdXL0FBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQVFNVWxFUVZSNG5PM2RUYXlsZDBISDhlOHcwNW0yMEFLVnRwU1dsb0pvTGRaWVJFVk5sUkFURXNKTFltS015K0pHTnlZdWpJbUpjZVBDeElURXVOQ05ibDBRRnVKTEY4WW9LaUMrWUJFb0NJVFNnZ0t0cFlWU090T1p6cmg0WnVoTTUrM096TDMzLzV6Ny8zeVN5VFJkL1hMdm5QTTl6L09jYzU0Q0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFJRDEyemQ2QU9kMVZYVjlkZDFwZjE5Nzh2L3ZydzVXQjZxWGpCckl0dmo1NmxkR2oyQk9CMFlQNEhzT1ZLK3FicTVlWGIweWdaN0IrMXAreis4YlBZVDVDTUJZQjZ2YnE5ZTFQUGw3d3AvVC9kV0pIQW13eXdSZzkrMnJYbFBkV2QyYVV6Z3NUaDBCaUFDN1JnQjJ6NzdxdGRVUFZ5OGZ2SVYxY2pxSVhTVUFPMjlmOVlicWg2cVhEZDdDK2prZHhLNFJnSjExWS9XVzZoV2poN0JSSEFtd0t3UmdaeHlzN3FuZW1BdTdYSjc3VC80dEF1d1lBZGgrcjYxK29pVUNjQ1djRG1KSENjRDJlVW5McS82N1J3OWhUM0U2aUIwakFOdmpaZFhQVkRlTUhzS2U1RWlBSFNFQVYrNkc2bTNWb2RGRDJOTWNDYkR0Qk9ESzNGemQxL0w5UExEVFhCaG1Xd25BNWJ1amVtcyt5Y3Z1RWdHMmpRQmNudGUxUFBsN2l5Y2p1Q2JBdHZEcTlkTGRYUDFrbnZ3WjYzM1ZuNDBld1dZVGdFdnpmZFhQNXVmR090eWZDSEFGUEpGdDNjdXFuOHRwTTlibC91cFBSNDlnTXduQTFyeWsrcW04MVpOMWNqcUl5eUlBVzNOdnl3MWJZSzJjRHVLU0NjREYzVnI5d09nUnNBVWl3Q1VSZ0F1N3V1WHRuckFwWEJOZ3l3VGd3bjQwMytySjVuRk5nQzBSZ1BPN3NlVyt2YkNKbkE3aW9nVGczUGExM01rTE5wa0ljRUVDY0c1dnlHMGMyUnRjRStDOEJPQnMrNnE3Um8rQWJlU2FBT2NrQUdlN283cHU5QWpZWms0SGNSWUJPSnRiT3JKWGlRQm5FSUF6M1ZxOWZQUUkyRUd1Q2ZBOUFuQW1iL3RrQnE0SlVBbkE2UTYySEFIQURKd09RZ0JPYzN0K0hzeEZCQ2JuQ2U4RnJ4czlBQVp3VFdCaUFyQTRtSzk3Wmw2dUNVeEtBQlkzNVI2L3pNM3BvQWtKd09LbTBRTmdCVVJnTWdLd3VIbjBBRmdKRVppSUFOUlYrZUkzT0owTHc1TVFnTHArOUFCWUlSZUdKeUFBdnZnTnpzZnBvRDFPQUJ3QndJV0l3QjRtQUFJQUZ5TUNlNVFBMURXakI4QUdjR0Y0RHhLQTVWMUF3TVc1TUx6SENFQWRHRDBBTm9qVFFYdUlBRGdDZ0VzbEFudUVBRGdDZ01zaEFudUFBUGdad09VU2dRM255USs0RWlLd3dRUUF1Rklpc0tFRUFOZ09JckNCQkFEWUxpS3dZUVFBMkU0aXNFRUVBTmh1SXJBaEJBRFlDU0t3QVFRQTJDa2lzSElDQU93a0VWZ3hBUUIybWdpc2xBQUF1MEVFVmtnQWdOMGlBaXNqQU1CdUVvRVZFUUJndDRuQVNnZ0FNSUlJcklBQXdGakhSZzhZU0FRR0V3QVk2L0RvQVlPSndFQUNBR1BOSG9BU2dXRUVBTVo2ZXZTQWxiaS8rdVBSSTJZakFERFcxMFlQV0pGZnpaSEFyaElBR0VzQXp1UjAwQzRTQUJqcks2TUhySkRUUWJ0RUFHQ3N6MVVuUm85WUlhZURkb0VBd0ZqZnJyNDZlc1JLT1IyMHd3UUF4dnZVNkFFcjVuVFFEaElBR08ram93ZXNuTk5CTzBRQVlMd3Y1V0x3eFRnZHRBUDJqeDZ3QXZlTUhnRFYxZm0zZURIM1ZxK3UvbnIwa0wzQ0VRQ3N3OTlWejR3ZXNRR2NEdHBHamdDODZtSWRqbFdIcWg4YVBXUUQzRnZkVWYzRjZDR2J6aEVBck1jRCtXNmdyZkx1b0czZ0NNQVJBT3R4dFBwTzlXT2poMnlJdCtSSTRJb0lnQUN3TG8rMC9Kdjh2dEZETm9RTHcxZEFBQVNBOWZsczliUFZWYU9IYkFoSEFwZEpBQVNBOVhtbStrYjExdEZETm9nTHc1ZEJBQVNBZGZxZjZwcnFqYU9IYkJDbmd5NlJBQWdBNi9XcDZzYVdWN1pzamROQmwwQUFCSUIxZTdDNnMrV1ZMVnZqU0dDTEJFQUFXTGZqMWNlcm02dlhEdDZ5U1J3SmJJRUFDQURyZDd6NnQxd1R1RlNPQkM1Q0FBU0F6ZkZmMWFQVmoxUUhCMi9aRkk0RUxrQUFCSUROOHIvVnYxYXZ6NGZGdHNxUndIa0lnQUN3ZVo2cFBsdzlWdjFneTVmSWNXR09CTTVCQUFTQXpmVm85ZmN0M3lGMGUwNExYWXdqZ1JjUkFBRmdzeDF0K2VxSXYyMzVJcmticXV1SExscTN0eVFDM3lNQUFzRGVjS3o2UWtzSVBsRTkyM0pxNk9YVnZvRzcxa2dFVGpvd2VnQ3c3UjQrK2FmcXV1cXU2cmJxTmRVdDFjdXFhMXR1UXpucmM4Q3Zudno3MTRhdUdHeldYejdNNHVtV3p4RDgyK2dockk4N2dnRk1TZ0FBSmlVQUFKTVNBSUJKQ1FEQXBBUUFZRklDQURBcEFRQ1lsQUFBVEVvQUFDWWxBQUNURWdDQVNRa0F3S1FFQUdCU0FnQXdLUUVBbUpRQUFFeEtBQUFtSlFBQWt4SUFnRWtKQU1Da0JBQmdVZ0lBTUNrQkFKaVVBQUJNU2dBQUppVUFBSk1TQUlCSkNRREFwQVFBWUZJQ0FEQXBBUUNZbEFBQVRFb0FBQ1lsQUFDVEVnQ0FTUWtBd0tRRUFHQlNBZ0F3S1FFQW1KUUFBRXhLQUFBbUpRQUFreElBZ0VrSkFNQ2tCQUJnVWdJQU1La0Rvd2V3TWE2cDNsemRYZDFlM1ZpOXROby9jaFE5WHoxVFBWNDlVajFVZmFJNlBISVVtMEVBdUpoYnFuZFhQMTBkSEx5RnMrMnZyai81NXczVjI2c2oxY2VxRDFWZkh6ZU50Uk1BenVkUTlZdlZPL0lxZjlNY3F0NVczVmM5VUgyZ09qcDBFYXNrQUp6TExkVnZWTGVOSHNJVjJWKzlxN3FyZW4vMTFOZzVySTJMd0x6WW5kWHY1c2wvTC9uKzZ2ZXFPMFlQWVYwRWdOUGRVdjFXeS9sazlwWWJxdCtzWGpGNkNPc2hBSnh5VmZYcmVmTGZ5MDVGd01WOEtnSGdCYitVVXdRenVMTjY3K2dScklNQVVNdXBuM2VNSHNHdWVXZE9CWkVBc0hoUDN1bzVrMFBWTDR3ZXdYZ0N3RFhWVzBlUFlOZmRWMTA5ZWdSakNRQnZibmxGeUZ3T1ZmZU9Ic0ZZQXNEZG93Y3d6SnRHRDJBc0FlRDIwUU1ZeHU5K2NnTEFUYU1ITUl6Zi9lUUVnR3RHRDJBWXYvdkpDUURBcEFTQVowY1BZQmkvKzhrSkFJK05Ic0F3ZnZlVEV3QWVHVDJBWWZ6dUp5Y0FQRFI2QU1OOGV2UUF4aElBL3JQbEhyTE01VWoxeWRFakdFc0FlTGJsQnVMTTVTUFY0ZEVqR0VzQXFQckw2dm5SSTlnMXg2b1BqUjdCZUFKQTFkZXFCMGFQWU5mOFRkNEJSQUxBQ3o1UWZYSDBDSGJjRjZvUGpoN0JPZ2dBcHh5dDNsODlNWG9JTytiSjZnOWJmdGNnQUp6aHFlb1BxbStPSHNLMmU2TDYvZnh1T1kwQThHS1BWcjlkZlc3MEVMYk5GNnZmcWI0eWVnanI0ajZ3ZGMvb0FTdDBwUHJveWY5K2ZYVmc0Qll1MzdIcXI2by9xYjQ3ZU10YVRmMWhPQUVRZ1BNNTN2SXA0USszM0Q3dzFvUmdVeHlwL3JINm8rcmpMYjlMem0zcUFPd2JQV0FGZm5uMGdBMXhkY3M5Wk4vVWNpZXBtNnByRTRYUmpyVzh1bitzNWJ0OVBsTTltQTk1YmRXZmp4NHdrZ2N2VzNXNDVSUERQalVNZTRTTHdBQ1RFZ0NBU1FrQXdLUUVBR0JTQWdBd0tRRUFtSlFBQUV4S0FBQW1KUUFBa3hJQWdFa0pBTUNrQkFCZ1VnSUFNQ2tCQUppVUFBQk1TZ0FBSmlVQUFKTVNBSUJKQ1FEQXBBUUFZRklDQURBcEFRQ1lsQUFBVEVvQUFDWWxBQUNURWdDQVNRa0F3S1FFQUdCU0FnQXdLUUVBbUpRQUFFenF3T2dCYkl4cnFqZFhkMWUzVnpkV0w2MzJqeHkxQXM5WHoxU1BWNDlVRDFXZnFBNlBIQVZiSVFCY3pDM1Z1NnVmcmc0TzNySkcrNnZyVC81NVEvWDI2a2oxc2VwRDFkZkhUWU1MRXdETzUxRDFpOVU3OGlyL1VoMnEzbGJkVnoxUWZhQTZPblFSbklNQWNDNjNWTDlSM1RaNnlJYmJYNzJydXF0NmYvWFUyRGx3SmhlQmViRTdxOS9Oay85Mit2N3E5Nm83UmcrQjB3a0FwN3VsK3EyVzg5bHNyeHVxMzZ4ZU1Yb0luQ0lBbkhKVjlldDU4dDlKcHlMZ1lqcXJJQUNjOGtzNVJiRWI3cXplTzNvRWxBQ3d1S1hsM1Q3c2puZm1WQkFySUFCVXZTZHY5ZHhOaDZwZkdEMENCSUJycXJlT0hqR2grNnFyUjQ5Z2JnTEFtMXRla2JLN0RsWDNqaDdCM0FTQXUwY1BtTmliUmc5Z2JnTEE3YU1IVE16UG5xRUVnSnRHRDVpWW56MURDUURYakI0d01UOTdoaElBZ0VrSkFNK09IakF4UDN1R0VnQWVHejFnWW43MkRDVUFQREo2d01UODdCbEtBSGhvOUlDSmZYcjBBT1ltQVB4bnl6MXMyVjFIcWsrT0hzSGNCSUJuVzI1Z3p1NzZTSFY0OUFqbUpnQlUvV1gxL09nUkV6bFdmV2owQ0JBQXFyNVdQVEI2eEVUK0p1OEFZZ1VFZ0ZNK1VIMXg5SWdKZktINjRPZ1JVQUxBQzQ1Vzc2K2VHRDFrRDN1eStzT1duelVNSndDYzdxbnFENnB2amg2eUJ6MVIvWDUrdHF5SUFQQmlqMWEvWFgxdTlKQTk1SXZWNzFSZkdUMEVUdWMrc0hYUDZBRXJkS1Q2Nk1uL2ZuMTFZT0NXVFhhcytxdnFUNnJ2RHQ3Q3VVMzlZVHdCRUlEek9kN3lLZUVQdDl5KzhOYUVZS3VPVlA5WS9WSDE4WmFmSmVzMGRRRDJqUjZ3QXI4OGVzQ0d1THJsSHJadmFybVQxVTNWdFluQ3NaWlg5NCsxZkxmUFo2b0g4eUd2VGZIbm93ZU1OUHVEbDYwNzNQS0pZWjhhaGozQ1JXQ0FTUWtBd0tRRUFHQlNBZ0F3S1FFQW1KUUFBRXhLQUFBbUpRQUFreElBZ0VrSkFNQ2tCQUJnVWdJQU1Da0JBSmlVQUFCTVNnQUFKaVVBQUpNU0FJQkpDUURBcEFRQVlGSUNBREFwQVFDWWxBQUFURW9BQUNZbEFBQ1RFZ0NBU1FrQXdLUUVBR0JTQWdBd0tRRUFtSlFBQUV4S0FBQW1KUUIxZlBRQVlJanBIL3NDVU1kR0R3Q0dPRHA2d0dnQzRCOEJ6R3I2eDc0QU9BS0FXVTMvMkJjQXJ3SmdWdE0vOWdXZ25oMDlBQmhpK3NlK0FOUzNSdzhBaHBqK3NTOEEvaEhBcktaLzdBdEFQVDE2QURERTlJOTlBZkFxQUdaMElnRVFnSlozQWp3MWVnU3dxNTdLdTRBRTRLUnZqQjRBN0NxUCtRVGdGUDhZWUM0ZTh3bkFLWSsxbkJNRTlyNFQxZU9qUjZ5QkFDeU9WdjgzZWdTd0t4N0wrZjlLQUU3MzVkRURnRjNoc1g2U0FMemdrZXI1MFNPQUhmVjg5ZFhSSTlaQ0FGNXd0UHFmMFNPQUhmWFY2cm5SSTlaQ0FNNzA4T2dCd0k3eUdEK05BSnpwZjZ0dmpSNEI3SWh2VlY4ZlBXSk5CT0JzRDQwZUFPeUl6K1R0M21jUWdMTTlrdThJZ2IzbTZlclIwU1BXUmdET2RxTDY3T2dSd0xaNktLLyt6eUlBNS9hbDZzblJJNEJ0OFdRdS9wNlRBSnpiaWVvL1JvOEFydGlKNnQvejZ2K2NCT0Q4SG04NUVnQTIxNWZ5TlMvbkpRQVg5bUIxWlBRSTRMSWNxVDQ1ZXNTYTdSODlZT1dlYjdsajJCMmpod0NYN0dPNWxuZEJBbkJ4VDFjSHExZU5IZ0pzMmVlcXo0OGVzWFpPQVczTmd6bVBDSnZpaVp6NjJSSUIySnJqTFllVHJnZkF1aDJ1L3JubE1jdEZPQVcwZGMrMTNFYnVkUWtuck5IUjZ1L3pTZjR0RTRCTDgyekw0ZVVkMWI3Qlc0QVhISy8rS2FkcUw0a0FYTHBucXU5VXR5VUNzQVluV2s3UnVwL0hKUktBeS9PdGszOXV6ZWtnR09sNDlTLzVvcmZMSWdDWDc5c3RoNXUzNWVjSUl4eHJPZTNqRm8rWHlSUFhsWG1tNVFZVHQxVUhCbStCbVJ4dXVlRDcrT2dobTB3QXJ0eXpMWWVmcjZxdUhid0ZadkRONmg5eTk3NHJKZ0RiNDJndmZOM3NqYms0RER2bDg5Vkg4cG1jYlNFQTIrdXg2cW5xMVRrbEJOdnBTUFhSNnIvejFjN2J4aXZWblhHd3VxZDZZMzdHY0tXK1hIMGlyL3EzblNlbm5YVkQ5ZU1uL3dZdXpaTXROM1B4NGE0ZElnQTdiMTkxWjNWM2RkM2dMYkFKbm02NWgrL0RPZDJ6b3dSZzkreXJYdE55YXVpVmc3ZkFHbjJyK216TEtSOVAvTHRBQU1aNFRjdFJ3YTI1RU0vY25tLzVJTmZEMWRjR2I1bU9BSXgxVlhWN3l6ZU1ldnNvc3pqUjhnR3VoNnV2dEx5Tm1nRTg0YXpIZ1pZUGs5M2M4amJTVitiM3c5N3huWlpQelgvajVOL1BqWjFEZVlKWnM2dGFMaHBmVjExLzhzKzFMYUU0MFBKVzB3UDVNanJHT3Q3eW5UelBuZno3V1BYZGx1L0srbmJMQmQybjh5b2ZBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUM0VFA4UGJLVURxbFVXS0dNQUFBQUFTVVZPUks1Q1lJST0iLz48dGV4dCBhcmlhLWhpZGRlbj0idHJ1ZSIgeD0iMzY1IiB5PSIxNTAiIGZpbGw9IiMwMTAxMDEiIGZpbGwtb3BhY2l0eT0iLjMiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiB0ZXh0TGVuZ3RoPSIyNzAiPkRvY3M8L3RleHQ+PHRleHQgeD0iMzY1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiBmaWxsPSIjZmZmIiB0ZXh0TGVuZ3RoPSIyNzAiPkRvY3M8L3RleHQ+PC9nPjwvc3ZnPg==" height="20"/></a>
	</p>


&nbsp;


<p align="center">
  <b>View our <a href="https://capitec.github.io/open-source/?repo=Omni-Components">full documentation</a> for more on component usage and live previews.</b></br>
  <sub><sub>
</p>



&nbsp;

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#table-of-contents)

## ⭑ Table of Contents

* [➜ Welcome to Omni Components ](#-welcome-to-omni-components-)
* [➜ UI Components](#-ui-components)
* [➜ Contributing and Usage](#-contributing-and-usage)
	* [⭑ Contributors](#-contributors)
	* [⭑ License](#-license)
&nbsp;


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#ui-components)

# ➜ UI Components
<table><thead><tr><th>Tag Name</th><th>Class</th><th>Description</th></tr></thead><tbody><tr><td>

[omni-button](src/button/README.md)

</td><td>Button</td><td>

A control that allows an action to be executed.


```js


import '@capitec/omni-components/button';

```

</td></tr><tr><td>

[omni-check](src/check/README.md)

</td><td>Check</td><td>

A control that allows a user to check a value on or off.


```js


import '@capitec/omni-components/check';

```

</td></tr><tr><td>

[omni-chip](src/chip/README.md)

</td><td>Chip</td><td>

A control that can be used for input, setting attributes, or performing actions.


```js


import '@capitec/omni-components/chip';

```

</td></tr><tr><td>

[omni-hyperlink](src/hyperlink/README.md)

</td><td>Hyperlink</td><td>

A link control that allows a user to indicate an action to be executed. Typically used for navigational purposes.


```js


import '@capitec/omni-components/hyperlink';

```

</td></tr><tr><td>

[omni-icon](src/icon/README.md)

</td><td>Icon</td><td>

Component that displays an icon


```js


import '@capitec/omni-components/icon';

```

</td></tr><tr><td>

[omni-check-icon](src/icons/README.md)

</td><td>CheckIcon</td><td>

A check icon component.


```js

import '@capitec/omni-components/icons/Check.icon.js';

```

</td></tr><tr><td>

[omni-close-icon](src/icons/README.md)

</td><td>CloseIcon</td><td>

A Close icon component.


```js

import '@capitec/omni-components/icons/Close.icon.js';

```

</td></tr><tr><td>

[omni-indeterminate-icon](src/icons/README.md)

</td><td>IndeterminateIcon</td><td>

An indeterminate icon component.


```js

import '@capitec/omni-components/icons/Indeterminate.icon.js';

```

</td></tr><tr><td>

[omni-label](src/label/README.md)

</td><td>Label</td><td>

A simple label component that renders styled text.


```js


import '@capitec/omni-components/label';

```

</td></tr><tr><td>

[omni-radio](src/radio/README.md)

</td><td>Radio</td><td>

A control that allows a user to select a single value from a group of values.


```js


import '@capitec/omni-components/radio';

```

</td></tr><tr><td>

[omni-switch](src/switch/README.md)

</td><td>Switch</td><td>

A control that allows a user to switch a value on or off.


```js


import '@capitec/omni-components/switch';

```

</td></tr></tbody></table>



&nbsp;

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributing-and-usage)

# ➜ Contributing and Usage


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributors)

## ⭑ Contributors

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/BOTLANNER">
            <img src="https://avatars.githubusercontent.com/u/16349308?v=4" width="100;" alt="BOTLANNER"/>
            <br />
            <sub><b>BOTLANNER</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/stefan505">
            <img src="https://avatars.githubusercontent.com/u/10812446?v=4" width="100;" alt="stefan505"/>
            <br />
            <sub><b>stefan505</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/chromaticWaster">
            <img src="https://avatars.githubusercontent.com/u/22874454?v=4" width="100;" alt="chromaticWaster"/>
            <br />
            <sub><b>chromaticWaster</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/capitec-oss">
            <img src="https://avatars.githubusercontent.com/u/109588738?v=4" width="100;" alt="capitec-oss"/>
            <br />
            <sub><b>capitec-oss</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#license)

## ⭑ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
