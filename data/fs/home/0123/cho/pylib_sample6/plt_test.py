import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import numpy.random as npr

# subplots, bar, show
# Axes set_title, legend
def test1():
    labels = ['G1', 'G2', 'G3', 'G4', 'G5']
    men_means = [20, 35, 30, 35, 27]
    women_means = [25, 32, 34, 20, 25]
    men_std = [2, 3, 4, 1, 2]
    women_std = [3, 5, 2, 3, 3]
    width = 0.35
    fig, ax = plt.subplots()
    ax.bar(labels, men_means, width, yerr=men_std, label='Men')
    ax.bar(labels, women_means, width, yerr=women_std, bottom=men_means,
           label='Women')
    ax.set_title('Scores by group and gender')
    ax.legend()
    plt.show()

#plot,xlabel,ylabel,title
def test2():
    x1 = np.linspace(0.0, 5.0)
    x2 = np.linspace(0.0, 2.0)
    y1 = np.cos(2 * np.pi * x1) * np.exp(-x1)
    y2 = np.cos(2 * np.pi * x2)
    #plt.subplot(2, 1, 1)
    plt.plot(x1, y1, 'o-')
    plt.title('A tale of 2 subplots')
    plt.ylabel('Damped oscillation')
    #plt.subplot(2, 1, 2)
    plt.plot(x2, y2, '.-')
    plt.xlabel('time (s)')
    plt.ylabel('Undamped')
    plt.show()

#scatter
def test3():
    np.random.seed(19680801)
    N = 50
    x = np.random.rand(N)
    y = np.random.rand(N)
    colors = np.random.rand(N)
    area = (30 * np.random.rand(N))**2  # 0 to 15 point radii
    plt.scatter(x, y, s=area, c=colors, alpha=0.5)
    plt.show()
    
#hist,grid
def test4():
    mu, sigma = 100, 15
    x = mu + sigma * np.random.randn(10000)
    # the histogram of the data
    n, bins, patches = plt.hist(x, 50, density=True, facecolor='g', alpha=0.75)
    plt.xlabel('Smarts')
    plt.ylabel('Probability')
    plt.title('Histogram of IQ')
    #plt.text(60, .025, r'$\mu=100,\ \sigma=15$')
    #plt.xlim(40, 160)
    #plt.ylim(0, 0.03)
    plt.grid(True)
    plt.show()

#pcolor
def test5():
	Z = np.random.rand(6, 10)
	# 文法エラー↓
	#fig, (ax0,ax1) = plt.subplots(2, 1)
	fig, ax01 = plt.subplots(2, 1)
	(ax0, ax1) = ax01
	#fig, ax0 = plt.subplots()
	c = ax0.pcolor(Z)
	ax0.set_title('default: no edges')
	c = ax1.pcolor(Z, edgecolors='k', linewidths=4)
	ax1.set_title('thick edges')
	fig.tight_layout()
	plt.show()

#xticks,yticks
def test6():
	N = 5
	menMeans = (20, 35, 30, 35, 27)
	womenMeans = (25, 32, 34, 20, 25)
	menStd = (2, 3, 4, 1, 2)
	womenStd = (3, 5, 2, 3, 3)
	ind = np.arange(N)    # the x locations for the groups
	width = 0.35       # the width of the bars: can also be len(x) sequence
	p1 = plt.bar(ind, menMeans, width, yerr=menStd)
	p2 = plt.bar(ind, womenMeans, width,
	             bottom=menMeans, yerr=womenStd)
	plt.ylabel('Scores')
	plt.title('Scores by group and gender')
	plt.xticks(ind, ('G1', 'G2', 'G3', 'G4', 'G5'))
	plt.yticks(np.arange(0, 81, 10))
	plt.legend((p1[0], p2[0]), ('Men', 'Women'))
	plt.show()

#clf,cla
def test7():
	N = 5
	menMeans = (20, 35, 30, 35, 27)
	womenMeans = (25, 32, 34, 20, 25)
	menStd = (2, 3, 4, 1, 2)
	womenStd = (3, 5, 2, 3, 3)
	ind = np.arange(N)    # the x locations for the groups
	width = 0.35       # the width of the bars: can also be len(x) sequence
	p1 = plt.bar(ind, menMeans, width, yerr=menStd)
	p2 = plt.bar(ind, womenMeans, width,
	             bottom=menMeans, yerr=womenStd)
	plt.ylabel('Scores')
	plt.title('Scores by group and gender')
	plt.xticks(ind, ('G1', 'G2', 'G3', 'G4', 'G5'))
	plt.yticks(np.arange(0, 81, 10))
	plt.legend((p1[0], p2[0]), ('Men', 'Women'))
	plt.clf()
	plt.cla()
	plt.show()
def test8():
	methods = [None, 'none', 'nearest', 'bilinear', 'bicubic', 'spline16',
			'spline36', 'hanning', 'hamming', 'hermite', 'kaiser', 'quadric',
			'catrom', 'gaussian', 'bessel', 'mitchell', 'sinc', 'lanczos']
	np.random.seed(19680801)
	grid = np.random.rand(4, 4)
	fig, axs = plt.subplots(nrows=3, ncols=6, figsize=(9, 6),
							subplot_kw={'xticks': [], 'yticks': []})
	for ax, interp_method in zip(axs.flat, methods):
		ax.imshow(grid, interpolation=interp_method, cmap='viridis')
		ax.set_title(str(interp_method))
	plt.tight_layout()
	plt.show()

test1()
test2()
test3()
test4()
test5()
test6()
test7()
test8()

